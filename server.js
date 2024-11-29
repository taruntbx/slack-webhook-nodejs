const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());

const SLACK_WEBHOOK_URL = 'https://hooks.slack.com/services/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';

app.post('/slack-update', async (req, res) => {
    try {
        const { title, message } = req.body;

        const slackMessage = {
            text: `*${title}*\n${message}`,
        };

        await axios.post(SLACK_WEBHOOK_URL, slackMessage);

        res.status(200).send({ status: 'Message sent to Slack!' });
    } catch (error) {
        console.error(error);
        res.status(500).send({ status: 'Failed to send message to Slack' });
    }
});

app.listen(3000, () => console.log('Server is running on port 3000'));