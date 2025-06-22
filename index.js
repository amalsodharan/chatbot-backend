import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import getChatGPTResponse from './service.js';

dotenv.config();

const app = express();
const PORT = 8080;

app.use(cors());
app.use(express.json());

app.get('/test', (req, res) => {
  res.json({ message: 'This is the API' });
});

app.post('/prompt', async (req, res) => {
  try {
    const input = req.body.input;
    if (!input || input.trim() === '') {
      return res.status(400).json({ error: 'Prompt is empty' });
    }

    console.log(`[Prompt received]: ${input}`);
    const answerHTML = await getChatGPTResponse(input);
    res.json({ answer: answerHTML });
  } catch (err) {
    console.error('Error in /prompt route:', err.message);
    res.status(500).json({ error: 'Failed to process the request' });
  }
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
