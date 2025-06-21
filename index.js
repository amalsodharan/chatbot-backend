const express = require('express')
const app =express()
require('dotenv').config()
const bodyParser = require('body-parser')
const getChatGPTResponse = require('./service')
const cors = require('cors')

app.use(cors())
app.use(express.json());

app.get('/test', (req, res) => {
    res.json({ message : 'this is the api' })
});

app.post('/prompt', async (req, res) => {
    try {
        const input = req.body.input;
        console.log(input);
        const resObj = await getChatGPTResponse(input);
        res.json({ answer: resObj });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.listen(8080, (req, res) => {
    console.log(`Server is running at 8080`)
});