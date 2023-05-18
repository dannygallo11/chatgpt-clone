const PORT = 8000
const express = require('express')
const cors = require('cors')
const app = express()

const API_KEY = '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'

app.use(express.json()) //Allows to pass JSON from frontend to backen
app.use(cors())

// Testing server connection
app.listen(PORT, () => console.log('Your backend is running on PORT ' + PORT))

// Create route
app.post('/completion', async (req, res) => {
    const options = {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${API_KEY}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            model : "gpt-3.5-turbo",
            messages: [{role: "user", content: req.body.message}],
            max_tokens: 100,
        })
    }
    try {
        // fetch and .json() require to be async function
        const response = await fetch('https://api.openai.com/v1/chat/completions', options)
        const data = await response.json()
        res.send(data) // .send() = sends to localhost:8000
    } catch (error) {
        console.error(error)
    }
})