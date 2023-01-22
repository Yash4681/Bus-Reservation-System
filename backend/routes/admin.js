const express = require("express");
const User = require("../models/User");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const fetchuser = require("../middleware/fetchuser");

const JWT_CODE = "helloalliam$yash";


//ROUTE 1: Authenticate a admin using post"/api/admin/login" - no login required
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
      if(user.isAdmin === false){
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
  
  //ROUTE 2: Get logged in user details using post"/api/auth/getuser" - Login required
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

module.exports = router;

