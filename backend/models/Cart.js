const mongoose = require("mongoose");
const {Schema} = mongoose;

const CartSchema = new Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required : true,
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
        type: Date,
        default: Date.now
    }
})

const Cart = mongoose.model("cart", CartSchema)
module.exports = Cart;