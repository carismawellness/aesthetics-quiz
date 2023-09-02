const functions = require("firebase-functions");
const axios = require('axios');
const e = require("cors");
const cors = require('cors')({origin: true});

const TOKEN_URL = 'https://accounts.zoho.eu/oauth/v2/token';
const CLIENT_ID = functions.config().zoho.client_id;
const CLIENT_SECRET = functions.config().zoho.client_secret;
const REFRESH_TOKEN = functions.config().zoho.refresh_token;
const API_URL = 'https://zohoapis.eu/crm/v4/';

exports.sendDataToZoho = functions.https.onRequest((req, res) => {
    cors(req, res, async () => {
        try {
            // Get new access token
            const response = await axios.post(TOKEN_URL, null, {
                params: {
                    refresh_token: REFRESH_TOKEN,
                    client_id: CLIENT_ID,
                    client_secret: CLIENT_SECRET,
                    grant_type: 'refresh_token',
                },
                headers: {
                    "Content-Type": "application/x-www-form-urlencoded"
                }
            });

            const accessToken = response.data.access_token;
            console.log("request body:", req.body);
            const data = req.body; // access data from client
            console.log("req.body: ", data);

            const comfort_with_injectables = data[2] === 'Yes';

            // Map data to Zoho format
            const zohoData = {
                "Skin_concerns": data[0],
                "Skin_type": data[1],
                "Comfort_with_injectables": comfort_with_injectables,
                "interested_treatment": data[3],
                "Where_did_you_hear_about_us": data[4],
                "Consultation_type1": data[5],
                "First_Name": data[6].first_name,
                "Last_Name": data[6].surname,
                "Email": data[6].email,
                "Phone": data[6].phone,
                "Lead_Source": "Quiz",
            };

            // get contact id
            const findContactResponse = await axios.get(`${API_URL}Contacts/search?email=${data[5].email}`, {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
            });

            // Get contact id if record was found
            let contactId = null;
            if (findContactResponse.data) {
                contactId = findContactResponse.data.data[0].id;
            }
            // Update contact if it exists
            const zohoResponse = ["Failed to update contact"];
            if (contactId) {
                try {
                        console.log("axios put request to: ", `${API_URL}Contacts/${contactId}`);
                        const zohoResponse = await axios.put(`${API_URL}Contacts/${contactId}`, {
                            data: [zohoData],
                            trigger: ['approval', 'workflow', 'blueprint'],
                        },
                        {
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${accessToken}`,
                        },
                        });
                } catch (error) {
                    console.log(error.message);
                }
            } else {
                // Send data to Zoho if contact doesn't exist
                const zohoResponse = await axios.post(`${API_URL}Contacts`, {
                    data: [zohoData],
                    trigger: ['approval', 'workflow', 'blueprint'],
                },
                {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${accessToken}`,
                },
                });
            }
            res.set('Access-Control-Allow-Origin', '*');
            res.status(200).send(zohoResponse.data);
        } catch (error) {
            console.error('Error updating Zoho contact', error);
            res.status(500).send('Failed to update Zoho contact' + error.message);
        }
    });
});


