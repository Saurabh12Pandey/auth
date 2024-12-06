const express = require('express');
const bodyParser = require('body-parser');
const kerberos = require('kerberos');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware to parse form data
app.use(bodyParser.urlencoded({ extended: true }));

// Serve the login page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

// Handle authentication
app.post('/auth', (req, res) => {
    const { username, password } = req.body;

    console.log("Authenticating:", username);

    // Debugging logs for parameters
    console.log("Parameters being passed:");
    console.log("Username:", username);
    console.log("Password:", password);
    console.log("Service:", 'HTTP/3.14.145.180@ac.in');

    // Use Kerberos to validate the credentials
    kerberos.checkPassword(
        username,                    // Username
        password,                    // Password
        'HTTP/3.14.145.180@ac.in',   // Kerberos service in the correct format
        (err, result) => {           // Callback function
            if (err) {
                console.error('Kerberos authentication failed:', err.message);
                return res.status(401).send('<h3>Authentication Failed. <a href="/">Try again</a></h3>');
            }

            console.log('Authentication successful:', result);
            res.redirect('/home'); // Success
        }
    );    
});

// Serve the home page
app.get('/home', (req, res) => {
    res.send('<h1>Welcome to the Home Page!</h1>');
});

// Start the server
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
