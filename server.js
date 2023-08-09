const express = require('express');
const axios = require('axios');

const app = express();
const port = 3000;

const apiKey = 'rzp_test_RGffn7bgBbJOjw'; // Replace with your actual Razorpay API Key
const apiSecret = 'bUk6F2XK8n0iNoeU7pWW1muO'; // Replace with your actual Razorpay API Secret

const baseUrl = 'https://api.razorpay.com/v1';

const authHeader = `Basic ${Buffer.from(`${apiKey}:${apiSecret}`).toString('base64')}`;

app.get('/payment/:paymentId', async (req, res) => {
  const paymentId = req.params.paymentId;

  try {
    const response = await axios.get(`${baseUrl}/payments/${paymentId}`, {
      headers: {
        Authorization: authHeader,
      },
    });

    const paymentDetails = response.data;
    res.json(paymentDetails);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching payment details' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
