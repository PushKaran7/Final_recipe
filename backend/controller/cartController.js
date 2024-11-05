const asyncHandler = require("express-async-handler");
const Cart = require("../models/cartModel");

const getCartItem=asyncHandler(async (req,res)=>{
    console.log("I am inside get cart items");
    console.log("this is the user in request-->",req.user);
    const val=await Cart.find({user_id:req.user.id});
    res.status(200).json(val);
});

const addCartItem=asyncHandler(async(req,res)=>{
    console.log("I am in add cart");
    try{
        const { name, quantity } = req.body;

        const val=await Cart.create({
            user_id:req.user.id,
            name,
            quantity
        });
        res.status(201).json({ message: "added Ingredient to cart", val });
        console.log(" Ingredient  added is -->", val);
    }
    catch (err) {
        console.error("Error adding Ingredient:", err.message);
        res.status(500).json({ message: "Error adding Ingredient" });
    }

});

const updateCartItem=asyncHandler(async (req,res)=>{
   try{
    console.log("I am in update cart Item");
    const val=await Cart.findOneAndUpdate(
        {_id:req.params.id},
        req.body,
        {new:true}
    );
    if (!val) {
        return res.status(404).json({ message: 'Ingredient not found' });
    }
    res.status(200).json(val);

   }
   catch(err){
    res.status(400).json({ message: err.message });
}

});

const deleteCartItem=asyncHandler(async(req,res)=>{
    try{
        console.log("I am inside delete ingredinet");
        const val=await Cart.findOne({_id:req.params.id});
        if(!val){
            res.status(404).json({message:"Ingredient not Found!"});
        }
        await Cart.findOneAndDelete({_id:req.params.id})
        res.status(200).json({message:"Deleted the Ingredient",val});

    }
    catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports={getCartItem,addCartItem,updateCartItem,deleteCartItem}