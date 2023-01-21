const mongoose = require("mongoose");
const {Schema} = mongoose;

const BusSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    owner:{
        type: String,
        required: true
    },
    title:{
        type:String,
        required:true
    },
    route:{
        type: String,
        required : true
    },
    price:{
        type: Number,
        required: true
    },
    date:{
        type:Date,
        default: Date.now
    }
})

module.exports = mongoose.model("Bus", BusSchema);