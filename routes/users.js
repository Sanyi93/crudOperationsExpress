const express = require('express');
const router = express.Router();


let users = [
    {
        firstName: "John",
        lastName: "wick",
        email:"johnwick@gamil.com",
        DOB:"22-01-1990",
    },
    {
        firstName: "John",
        lastName: "smith",
        email:"johnsmith@gamil.com",
        DOB:"21-07-1983",
    },
    {
        firstName: "Joyal",
        lastName: "white",
        email:"joyalwhite@gamil.com",
        DOB:"21-03-1989",
    },
];

// GET request: Retrieve all users
router.get("/",(req,res)=>{
    res.send(uers)//retrieve the array of objects defined above
});

// GET by specific ID request: Retrieve a single user with email ID
router.get("/:email",(req,res)=>{
    //extracting the email parameter from the url request
    const email = req.params.email;
    //filtering users based on the email in the request body
    filtered_users = users.filter((user) => user.email === email);
    //sending filtered_users as the response to the client
    res.send(filtered_users)
});


// POST request: Create a new user
router.post("/",(req,res)=>{
    //pushing a new user to the users array
    users.push({
        "firstName:": req.query.firstName,
        "lastName": req.query.lastName,
        "email": req.query.email,
        "DOB": req.query.DOB
    });
  // Sending a message indicating which user has been recently added
  res.send("The user "+ req.query.firstName + " has been added!");
});
///////////////////////////////////////////////////////////////////////////////////////////////
//STEP No 5 - CONTINUE///
//////////////////////////////////////////////////////////////////////////////////////////////
// PUT request: Update the details of a user by email ID
router.put("/:email", (req, res) => {
  // Copy the code here
  res.send("Yet to be implemented")//This line is to be replaced with actual return value
});


// DELETE request: Delete a user by email ID
router.delete("/:email", (req, res) => {
  // Copy the code here
  res.send("Yet to be implemented")//This line is to be replaced with actual return value
});

module.exports=router;
