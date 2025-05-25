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
//sending a JSON response containing the users array formatted with an indentation of 4 spaces
res.send(JSON.stringify({users}, null, 4));
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
  // extracting email parameter & finding users with matching email
  const email = req.params.email;
  let filtered_users = users.filter((user) => user.email === email);

  if(filtered_users_users.length > 0) {
    //selecting the first matching user and updating his/her attributes
    let filtered_user = filtered_users[0];

    //extracting & updating DOB
    let DOB = req.params.DOB;
    if(DOB){
        filtered_user.DOB = DOB;
    }
    //extracting & updating first & last name
    let firstName = req.params.firstName;
    if(firstName){
        filtered_user.firstName = firstName;
    }
    let lastName = req.params.lastName;
    if(lastName){
        filtered_user.lastName = lastName;
    }

    //replacing old user entry with updated user
    users = users.filter((user) => user.email != email);
    users.push(filtered_user);

    //send success mesage indicating the user has been updated
    res.send(`User with the ${email} has been updated.`);

    //if no matching user has ben found
  } else {
    res.send('Unable to find user!');

  }

  //request Samples - updating the user´s DOB 
  //curl --request PUT 'localhost:5000/user/johnsmith@gamil.com?DOB=1/1/1971'
  // then verifying the request
  //curl localhost:5000/user/johnsmith@gamil.com

});


// DELETE request: Delete a user by email ID
router.delete("/:email", (req, res) => {
  // extracting the mail parameter from the request URL
  const email = req.params.email;
  //filter the users array to exclude the user with the specified email
  users = users.filter((user) => user.email != email);
  //sending the success msg as a response the user with the concrete email address has been deleted
  res.send(`The user with the email ${email} has been deleted`);
});

module.exports=router;
