const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require("../middleware/fetchuser");


//ROUTE 1: create a user using post"/api/auth/createuser" - no login required
const JWT_CODE = "helloalliam$yash";
router.post("/createuser", async (req,res) => {

  let success = false;

    //if there are errors return bad req
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({success, errors: errors.array() });
    }
    
    //check wether the user with this email already exist
    try {
    let user = await User.findOne({email : req.body.email});
    if(user){
        return res.status(400).json({success, error: "please enter valid credentials"})
    }    

    //hashing & salting
    const salt = await bcrypt.genSalt(10);
    const secCode = await bcrypt.hash(req.body.password, salt);
    
    // creating user
    user = await User.create({
        name: req.body.name,
        email: req.body.email,
        password: secCode,
        isAdmin: req.body.isAdmin,
        isOwner: req.body.isOwner,
      })

      //response data
      const data = {
        user: {
            id: user.id
        }
      }
      //jwt sign
    const token = jwt.sign(data, JWT_CODE);

    success = true;
      res.json({success, token});
      // res.send(req.body);


    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal error occured");
    }
})

//ROUTE 2: Authenticate a user using post"/api/auth/login" - no login required
router.post("/login",[

  //Authentication
  body('email', "enter a valid email").isEmail(),
  body('password', "password cannot be blank").exists(),

] , async (req,res) => {

  let success = false;
  //if there are errors return bad req
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  //destructuring body
  const {email, password} = req.body;
  try {

    //checking if user with this email exist
    const user = await User.findOne({email});
    if(!user){
      return res.status(400).json({success, error: "please enter valid credentials"})
    }
    
    //authenticating password
    const comparepassword = await bcrypt.compare(password, user.password);
    if(!comparepassword){
      return res.status(400).json({success, error: "please enter valid credentials"})
    }   

    const data = {
      user: {
          id: user.id
      }
    }
    success = true;
    const token = jwt.sign(data, JWT_CODE);
      res.json({success, token});

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal error occured");
}

});

//ROUTE 3: Get logged in user details using post"/api/auth/getuser" - Login required
router.post("/getuser", fetchuser ,async (req,res) => {

  try {
    const userID = req.user.id;
    const user = await User.findById(userID).select("-password");
    res.send(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal error occured");
  }
});

//ROUTE 4: Authenticate a owner using post"/api/auth/owner" - no login required
router.post("/owner",[

  //Authentication
  body('email', "enter a valid email").isEmail(),
  body('password', "password cannot be blank").exists(),

] , async (req,res) => {

  let success = false;
  //if there are errors return bad req
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  //destructuring body
  const {email, password} = req.body;
  try {

    //checking if user with this email exist
    const user = await User.findOne({email});
    if(!user){
      return res.status(400).json({success, error: "please enter valid credentials"})
    }
    if(user.isOwner === false){
      return res.status(401).json({success, error: "Not Allowed"})
    }

    
    //authenticating password
    const comparepassword = await bcrypt.compare(password, user.password);
    if(!comparepassword){
      return res.status(400).json({success, error: "please enter valid credentials"})
    }   

    const data = {
      user: {
          id: user.id
      }
    }
    success = true;
    const token = jwt.sign(data, JWT_CODE);
      res.json({success, token});

  } catch (error) {
    console.error(error.message);
    res.status(500).send("Internal error occured");
}

});

module.exports = router;