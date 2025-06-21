const axios = require('axios');
require('dotenv').config();

const getChatGPTResponse = async (prompt) => {
    const startTime = Date.now(); // Log start time
    try {
        const response = await axios.post('https://api.openai.com/v1/chat/completions', {
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: 'You are a helpful assistant.' },
                { role: 'user', content: prompt },
            ],
        }, {
            headers: {
                'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
                'Content-Type': 'application/json',
            },
        });

        const endTime = Date.now(); // Log end time
        console.log(`OpenAI API call took ${endTime - startTime}ms`);

        // Check if the response has the correct structure
        if (response.data && response.data.choices && response.data.choices[0] && response.data.choices[0].message) {
            return response.data.choices[0].message.content;
        } else {
            throw new Error('Invalid response from OpenAI API');
        }
    } catch (error) {
        console.error('Error calling OpenAI API:', error);
        throw new Error('Error calling OpenAI API');
    }
};


module.exports = getChatGPTResponse;