const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();

const YOUR_CLIENT_ID = "a22df87cef72062af190";
const YOUR_CLIENT_SECRET = "f6514604169747de1d5dc60b555d843bb1f1e198";

app.use(cors()); // Enable CORS
app.use(express.json());

app.post('/api/github/oauth', async (req, res) => {
  const { code } = req.body;

  try {
    const response = await axios.post('https://github.com/login/oauth/access_token', {
      client_id: YOUR_CLIENT_ID,
      client_secret: YOUR_CLIENT_SECRET,
      code: code,
    }, {
      headers: {
        accept: 'application/json'
      }
    });

    const accessToken = response.data.access_token;
    res.json({ accessToken });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error fetching access token' });
  }
});

app.listen(4000, () => console.log('Server running on port 4000'));