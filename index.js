const express = require('express');
const { GPTx } = require('@ruingl/gptx');
const axios = require('axios');

const app = express();
const gptx = new GPTx({ provider: 'Aryahcr', model: 'gpt-4' });

// Middleware to parse JSON requests
app.use(express.json());

// Define the /chat endpoint
app.post('/chat', async (req, res) => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ error: 'Message is required' });
  }

  const messages = [{ role: 'user', content: message }];
  
  try {
    const response = await gptx.ChatCompletion(messages);
    console.log(`Received GPTx Response: ${JSON.stringify(response)}`);
    
    // Send back the response
    res.json({ reply: response });
  } catch (error) {
    console.error('Error with GPTx ChatCompletion:', error);
    res.status(500).json({ error: 'Error with GPTx ChatCompletion' });
  }
});

// Start the server
const port = process.env.PORT || 5600;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
