const express = require("express");
const Bus = require("../models/Buses");
const router = express.Router();
const { body, validationResult } = require('express-validator');
const fetchuser = require("../middleware/fetchuser");


//Route 1: Get users Buses using: GET: "/api/buses/fetchbuses" - Login required
router.get("/fetchbuses", fetchuser, async (req,res) => {
    try {
        const buses = await Bus.find({user: req.user.id});
        res.json(buses);     
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal error occured");
    }
})

//Route 2: Add a new Bus using: POST "/api/buses/addbus" - Login required
router.post("/addbus", fetchuser, async (req,res) => {

    try {

        const {owner, title, route, price} = req.body;

        const bus = new Bus({
            owner, title, route, price, user: req.user.id
        }) 
        const savedbus = await bus.save();
        res.json({savedbus});

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal error occured");
    }
})

//Route 3:Update Bus using: PUT "/api/buses/updatebus" - Login required
router.put("/updatebus/:id", fetchuser, async (req,res) => {

    try {
    
    const {title, route, price} = req.body;

    //create newBus object.
    const newBus =  {};
    if(title){newBus.title = title};
    if(route){newBus.route = route};
    if(price){newBus.price = price};

    //find the bus to be updated and update it.
    let bus = await Bus.findById(req.params.id);
    if(!bus){return res.status(404).send("Not Found")}

    //Allow updation only if user owns it.
    // if(bus.user.toString() !== req.user._id){return res.status(401).send("Not Allowed")}

    bus = await Bus.findByIdAndUpdate(req.params.id, {$set: newBus}, {new: true});
    res.json({bus});

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal error occured");
    }

});

//Route 4: Delete Bus using: DELETE "/api/buses/deletebus/" - Login required
router.delete("/deletebus/:id", fetchuser, async (req,res) => {

    try {
        
    //find the bus to be updated and update it.
    let bus = await Bus.findById(req.params.id);
    if(!bus){return res.status(404).send("Not Found")}

    //Allow deletion only if user owns it.
    // if(bus.user.toString() !== req.user.id){return res.status(401).send("Not Allowed")}

    bus = await Bus.findByIdAndDelete(req.params.id);
    res.json({"Succes" :"Bus has been deleted", Bus: bus});

    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal error occured");
    }

});

//Route 5: Get all the Buses using: GET: "/api/buses/fetchallbuses" - Login required
router.get("/fetchallbuses", async (req,res) => {
    try {
        const buses = await Bus.find();
        res.json(buses);     
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal error occured");
    }

})


module.exports = router;