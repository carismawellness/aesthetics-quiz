const GHL_API_URL = 'https://services.leadconnectorhq.com';
const GHL_API_KEY = process.env.GHL_API_KEY;
const GHL_LOCATION_ID = 'Goi7kzVK7iwe2woxUHkT';

const GHL_CUSTOM_FIELDS = {
    skinConcerns   : 'am8nNn4YuI1JRabDLunK',
    skinType       : 'vKRvABX49b3SnJGUbAn8',
    injectables    : 'YnMzGHVstV0MOFacRRbR',
    treatment      : 'ZnN24StycI2h48AGdXgF',
    referralSource : 'fvxWpy0h67N9DGrbO3v0',
    consultation   : 'hhfPb91ew6f7ihDMl9DX',
};

const CORS_HEADERS = {
    'Access-Control-Allow-Origin' : '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const ghlHeaders = {
    'Authorization': `Bearer ${GHL_API_KEY}`,
    'Version'      : '2021-07-28',
    'Content-Type' : 'application/json',
};

exports.handler = async (event) => {
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 204, headers: CORS_HEADERS, body: '' };
    }

    try {
        const data = JSON.parse(event.body);

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

        // Check for existing contact by email
        let contactId = null;
        try {
            const searchRes = await fetch(
                `${GHL_API_URL}/contacts/?locationId=${GHL_LOCATION_ID}&email=${encodeURIComponent(contactInfo.email)}&limit=1`,
                { headers: ghlHeaders }
            );
            const searchData = await searchRes.json();
            if (searchData?.contacts?.length > 0) {
                contactId = searchData.contacts[0].id;
            }
        } catch (_) {}

        let ghlRes;
        if (contactId) {
            ghlRes = await fetch(`${GHL_API_URL}/contacts/${contactId}`, {
                method : 'PUT',
                headers: ghlHeaders,
                body   : JSON.stringify(contactPayload),
            });
        } else {
            ghlRes = await fetch(`${GHL_API_URL}/contacts/`, {
                method : 'POST',
                headers: ghlHeaders,
                body   : JSON.stringify(contactPayload),
            });
            const ghlData = await ghlRes.json();
            contactId = ghlData?.contact?.id;
        }

        // Add note with full quiz breakdown
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

        return {
            statusCode: 200,
            headers   : CORS_HEADERS,
            body      : JSON.stringify({ success: true, contactId }),
        };
    } catch (error) {
        return {
            statusCode: 500,
            headers   : CORS_HEADERS,
            body      : 'Failed to send to GoHighLevel: ' + error.message,
        };
    }
};
