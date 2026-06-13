import axios from 'axios';

export const sendDataToGHL = async (data) => {
  try {
    const response = await axios.post(
      '/api/sendDataToGHL',
      data
    );
    console.log(response.data);
  } catch (error) {
    console.log('Error sending data to GoHighLevel', error);
  }
};
