// Import required modules
const fs = require('fs');
const express = require('express');
const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static('public'));

// Enable JSON body parsing for incoming requests
app.use(express.json());

// Define a POST endpoint for handling login requests
app.post('/login', (req, res) => {
    // Extract email and password from the request body
    const { email, password } = req.body;

    // Read the 'users.json' file to retrieve user data
    fs.readFile('users.json', 'utf8', (err, data) => {
        if (err) {
            // Handle server error if unable to read the file
            res.status(500).send('Server error');
            return;
        }

        // Parse the JSON data to access the 'users' object
        const users = JSON.parse(data).users;
        const user = users[email];

        if (!user) {
            // User not found: Send a 401 Unauthorized response
            res.status(401).send({ success: false, message: 'Email not recognized' });
        } else if (user.password !== password) {
            // Incorrect password: Send a 401 Unauthorized response
            res.status(401).send({ success: false, message: 'Incorrect password' });
        } else {
            // Successful login: Send a success response with the user's name
            res.send({ success: true, message: `Welcome, ${user.name}` });
        }
    });
});

// Start the server and listen on the specified port
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
