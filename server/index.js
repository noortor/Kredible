
const express = require('express'); 
const cors = require('cors');
const twilio = require('twilio'); 

const accountSid = '';
const authToken = ''; 
const client = new twilio(accountSid, authToken);

const app = express();

app.use(cors());
app.get('/', (req, res) => {
    res.send("You're in!")
})
app.get('/send-parent-text', (req, res) => {
    res.send('Sent to parent')

    const { recipient, textmessage } = req.query;

    client.messages.create({
        body: textmessage,
        to: '',
        from: '' 
    }).then((message) => console.log(message.body));
})

app.listen(4000, () => console.log("Running on Port 4000"))