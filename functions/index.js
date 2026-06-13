const functions = require("firebase-functions");
const axios = require('axios');
const cors = require('cors')({origin: true});

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

const GHL_HEADERS = (key) => ({
    'Authorization': `Bearer ${key}`,
    'Version': '2021-07-28',
    'Content-Type': 'application/json',
});

exports.sendDataToGHL = functions.https.onRequest((req, res) => {
    cors(req, res, async () => {
        try {
            const data = req.body;
            console.log("Quiz submission received:", JSON.stringify(data));

            const skinConcerns   = Array.isArray(data[0]) ? data[0].join(', ') : data[0];
            const skinType       = data[1];
            const injectables    = data[2];
            const treatment      = data[3];
            const hearAboutUs    = data[4];
            const consultation   = data[5];
            const contactInfo    = data[6];

            const apiKey = GHL_API_KEY;

            const contactPayload = {
                locationId  : GHL_LOCATION_ID,
                firstName   : contactInfo.first_name,
                lastName    : contactInfo.surname,
                email       : contactInfo.email,
                phone       : contactInfo.phone,
                source      : 'Quiz',
                tags        : [
                    `quiz-lead`,
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

            // Check if contact already exists by email
            let contactId = null;
            try {
                const searchRes = await axios.get(
                    `${GHL_API_URL}/contacts/search?locationId=${GHL_LOCATION_ID}&email=${encodeURIComponent(contactInfo.email)}&limit=1`,
                    { headers: GHL_HEADERS(apiKey) }
                );
                const found = searchRes.data?.contacts;
                if (found && found.length > 0) {
                    contactId = found[0].id;
                }
            } catch (searchErr) {
                console.log("Contact search failed, will create new:", searchErr.message);
            }

            let ghlResponse;
            if (contactId) {
                ghlResponse = await axios.put(
                    `${GHL_API_URL}/contacts/${contactId}`,
                    contactPayload,
                    { headers: GHL_HEADERS(apiKey) }
                );
                console.log("Updated existing GHL contact:", contactId);
            } else {
                ghlResponse = await axios.post(
                    `${GHL_API_URL}/contacts/`,
                    contactPayload,
                    { headers: GHL_HEADERS(apiKey) }
                );
                contactId = ghlResponse.data?.contact?.id;
                console.log("Created new GHL contact:", contactId);
            }

            // Add a note with the full quiz breakdown
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

                await axios.post(
                    `${GHL_API_URL}/contacts/${contactId}/notes/`,
                    { body: noteBody, userId: contactId },
                    { headers: GHL_HEADERS(apiKey) }
                );
            }

            res.set('Access-Control-Allow-Origin', '*');
            res.status(200).send({ success: true, contactId });

        } catch (error) {
            console.error('Error sending to GHL:', error.response?.data || error.message);
            res.status(500).send('Failed to send to GoHighLevel: ' + error.message);
        }
    });
});
