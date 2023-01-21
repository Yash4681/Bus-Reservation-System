const express = require("express");
const User = require("../models/User");
const router = express.Router();
const fetchuser = require("../middleware/fetchuser");
const Cart = require("../models/Cart");

//Route 1: Get all the Users using: GET: "/api/users/fetchallusers" - Login required

router.get("/fetchallusers", fetchuser, async (req,res) => {
    try {
        const Users = await User.find();
        res.json(Users);     
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal error occured");
    }

})

//Route 2: Delete user using: DELETE "/api/users/deleteuser/" - Login required
router.delete("/deleteuser/:id", fetchuser, async (req,res) => {

    try {
        
    //find the note to be updated and update it.
    let user = await User.findById(req.params.id);
    if(!user){return res.status(404).send("Not Found")}

    //Allow deletion only if user owns it.
    // if(bus.user.toString() !== req.user.id){return res.status(401).send("Not Allowed")}

    user = await User.findByIdAndDelete(req.params.id);
    res.json({"Succes" :"Bus has been deleted", User: user});

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal error occured");
    }

});

//Route 3: Add to cart using: POST "/api/users/addcart" - Login required
router.post("/addcart", fetchuser, async (req,res) => {


    try {
        const {name, email, owner, title, route, price} = req.body;

        const cart = new Cart({
            name, email, owner, title, route, price, user: req.user.id
        }) 
        const savedcart = await cart.save();
        res.json({savedcart});

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal error occured");
    }
})

//Route 4: Get users Cart using: GET: "/api/users/fetchcart" - Login required
router.get("/fetchcart", fetchuser, async (req,res) => {
    try {
        const cart = await Cart.find();
        res.json(cart);     
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal error occured");
    }
})

//Route 4: Delete Cart using: DELETE "/api/users/deletecart/" - Login required
router.delete("/deletecart/:id", fetchuser, async (req,res) => {

    try {
        
    //find the note to be updated and update it.
    let cart = await Cart.findById(req.params.id);
    if(!cart){return res.status(404).send("Not Found")}

    //Allow deletion only if user owns it.
    // if(bus.user.toString() !== req.user.id){return res.status(401).send("Not Allowed")}

    cart = await Cart.findByIdAndDelete(req.params.id);
    res.json({"Succes" :"Cart has been deleted", Cart: cart});

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal error occured");
    }

});

module.exports = router;
