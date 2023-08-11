import axios from 'axios';

export const sendDataToZoho = async (data) => {
  try {
    const response = await axios.post('https://us-central1-smart-questionnaire.cloudfunctions.net/sendDataToZoho', data);
    console.log(response.data); // The result of the function.
  } catch (error) {
    console.log('Error updating Zoho contact', error);
  }
};
