const mongoose=require("mongoose");

const cartSchema=mongoose.Schema({
    user_id:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"User"
    },
    name: { 
        type: String, 
        required: true 
    },    
    quantity: { 
        type: Number, 
        required: true 
    }    
});

const Cart=mongoose.model("Cart",cartSchema);
module.exports=Cart;

