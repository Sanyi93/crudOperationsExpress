const express = require('express');
const routes = require('./routes/users.js');
const jwt = require('jsonwebtoken');
const session = require('express-session');

const app = express();
const PORT = 5000;

// Initialize session middleware with options
//secret -> a random unique string key used to authenticate a session
//resave -> it enables the session to be stored back to the session store, even if the session was never modified during the request
//saveUninitialized -> allowing any uninitialized sessions to be sent to the store. When a session is created but not modified it is reffered as "uninitialized"
app.use(session({ secret: "fingerpint", resave: true, saveUninitialized: true }));

// Middleware for user authentication; all endpoints starting with "/user" will go through this mw
app.use("/user", (req, res, next) => {
    // Check if user is authenticated
    if (req.session.authorization) {
        let token = req.session.authorization['accessToken']; // Access Token
        
        // Verify JWT token for user authentication
        jwt.verify(token, "access", (err, user) => {
            if (!err) {
                req.user = user; // Set authenticated user data on the request object
                next(); // Proceed to the next middleware
            } else {
                return res.status(403).json({ message: "User not authenticated" }); // Return error if token verification fails
            }
        });
        
        // Return error if no access token is found in the session
    } else {
        return res.status(403).json({ message: "User not logged in" });
    }
});

// Parse JSON request bodies
app.use(express.json());

// User routes
app.use("/user", routes);

// Login endpoint
app.post("/login", (req, res) => {
    const user = req.body.user;
    if (!user) {
        return res.status(404).json({ message: "Body Empty" });
    }
    // Generate JWT access token
    let accessToken = jwt.sign({
        data: user
    }, 'access', { expiresIn: 60 * 60 }); // time in seconds

    // Store access token in session
    //accessToken set into the session object to ensure that only authenticated users can access the endpoints for that length of time
    req.session.authorization = {
        accessToken
    }
    return res.status(200).send("User successfully logged in");
});

// Start server
app.listen(PORT, () => console.log("Server is running at port " + PORT));
