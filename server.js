const express = require('express');
const path = require('path');

const app = express();
const port = 3001;

// variable to store the user's name
let userName = "";

// middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// home page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// take in the user's name using POST
app.post('/submit-name', (req, res) => {
    userName = req.body.name;
    res.redirect('/greet');
});

// display the name using GET
app.get('/greet', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Greeting</title>
            <style>
                body {
                    font-family: Arial, sans-serif;
                    text-align: center;
                    margin-top: 100px;
                    background: #0f172a;
                    color: white;
                }
                .box {
                    width: 400px;
                    margin: auto;
                    padding: 40px;
                    border-radius: 20px;
                    background: #1e293b;
                    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
                }
                a {
                    color: #a78bfa;
                    text-decoration: none;
                    font-weight: bold;
                }
            </style>
        </head>
        <body>
            <div class="box">
                <h1>Hello, ${userName || "Guest"}!</h1>
                <a href="/">Go Back</a>
            </div>
        </body>
        </html>
    `);
});

app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`);
});