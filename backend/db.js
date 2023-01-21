const dotenv = require("dotenv");
const mongoose = require("mongoose");

dotenv.config();

const connectToMongo = async() => {
    try {
        mongoose.connect("mongodb://localhost:27017/fakeBusDB", () => {
            console.log("connected to mongo successfully");
        });
    } catch (error) {
        throw error;
    }
    
    mongoose.connection.on("disconnected", () => {
        console.log("mongoDB Disconnected");
    })
}

module.exports = connectToMongo;