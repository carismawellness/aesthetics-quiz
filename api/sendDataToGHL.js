const GHL_API_URL    = 'https://services.leadconnectorhq.com';
const GHL_API_KEY    = process.env.GHL_API_KEY;
const GHL_LOCATION_ID = 'Goi7kzVK7iwe2woxUHkT';

const GHL_CUSTOM_FIELDS = {
    skinConcerns   : 'am8nNn4YuI1JRabDLunK',
    skinType       : 'vKRvABX49b3SnJGUbAn8',
    injectables    : 'YnMzGHVstV0MOFacRRbR',
    treatment      : 'ZnN24StycI2h48AGdXgF',
    referralSource : 'fvxWpy0h67N9DGrbO3v0',
    consultation   : 'hhfPb91ew6f7ihDMl9DX',
};

const ghlHeaders = {
    'Authorization': `Bearer ${GHL_API_KEY}`,
    'Version'      : '2021-07-28',
    'Content-Type' : 'application/json',
};

module.exports = async (req, res) => {
    res.setHeader('Access-Control-Allow-Origin',  '*');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');

    if (req.method === 'OPTIONS') return res.status(204).end();
    if (req.method !== 'POST')   return res.status(405).end('Method Not Allowed');

    try {
        const data = req.body;

        const skinConcerns = Array.isArray(data[0]) ? data[0].join(', ') : data[0];
        const skinType     = data[1];
        const injectables  = data[2];
        const treatment    = data[3];
        const hearAboutUs  = data[4];
        const consultation = data[5];
        const contactInfo  = data[6];

        const contactPayload = {
            locationId  : GHL_LOCATION_ID,
            firstName   : contactInfo.first_name,
            lastName    : contactInfo.surname,
            email       : contactInfo.email,
            phone       : contactInfo.phone,
            source      : 'Quiz',
            tags        : [
                'quiz-lead',
                `skin-type:${skinType}`,
                `injectables:${injectables}`,
                `consultation:${consultation}`,
                `heard-via:${hearAboutUs}`,
            ],
            customFields: [
                { id: GHL_CUSTOM_FIELDS.skinConcerns,   value: skinConcerns },
                { id: GHL_CUSTOM_FIELDS.skinType,       value: skinType },
                { id: GHL_CUSTOM_FIELDS.injectables,    value: injectables },
                { id: GHL_CUSTOM_FIELDS.treatment,      value: treatment },
                { id: GHL_CUSTOM_FIELDS.referralSource, value: hearAboutUs },
                { id: GHL_CUSTOM_FIELDS.consultation,   value: consultation },
            ],
        };

        // Create or update the contact in a single call. GHL's /contacts/upsert
        // matches on email/phone, so returning leads and re-submissions update the
        // existing record instead of failing with "This location does not allow
        // duplicated contacts" (which the old search-then-create flow did silently).
        const upsert = async (payload) => {
            const r = await fetch(`${GHL_API_URL}/contacts/upsert`, {
                method : 'POST',
                headers: ghlHeaders,
                body   : JSON.stringify(payload),
            });
            return r.json();
        };

        let result    = await upsert(contactPayload);
        let contactId = result?.contact?.id || null;

        // If the full payload is rejected (e.g. a custom-field issue), still
        // capture the lead's contact details so we never lose a way to reach them.
        if (!contactId) {
            result = await upsert({
                locationId: GHL_LOCATION_ID,
                firstName : contactInfo.first_name,
                lastName  : contactInfo.surname,
                email     : contactInfo.email,
                phone     : contactInfo.phone,
                source    : 'Quiz',
                tags      : ['quiz-lead'],
            });
            contactId = result?.contact?.id || null;
        }

        if (!contactId) {
            return res.status(502).json({ error: 'Failed to send to GoHighLevel', details: result });
        }

        if (contactId) {
            const noteBody = [
                '--- Quiz Lead Submission ---',
                `Skin Concerns: ${skinConcerns}`,
                `Skin Type: ${skinType}`,
                `Comfortable with Injectables: ${injectables}`,
                `Treatment Interest: ${treatment}`,
                `Where They Heard About Us: ${hearAboutUs}`,
                `Consultation Type: ${consultation}`,
            ].join('\n');

            await fetch(`${GHL_API_URL}/contacts/${contactId}/notes/`, {
                method : 'POST',
                headers: ghlHeaders,
                body   : JSON.stringify({ body: noteBody }),
            });
        }

        res.status(200).json({ success: true, contactId });

    } catch (error) {
        res.status(500).json({ error: 'Failed to send to GoHighLevel: ' + error.message });
    }
};
