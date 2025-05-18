// Import Express and user routes, create an instance of Express
const express = require('express');
const routes = require('./routes/users.js');
const app = express();
const PORT = 5000;

//POST - creating a resource
//PUT - updating a resource

// Use JSON parsing middleware and user routes
app.use(express.json()); // handling requests as a json object
app.use("/user", routes); // handling endpoint starting with "/user" - those are defined in "routes" folder in the file "users.js"

// Start the server and log a message when it's running
app.listen(PORT, () => console.log("Server is running at port " + PORT));
