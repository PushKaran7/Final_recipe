const mongoose=require("mongoose");

const userSchema=mongoose.Schema({
   
    email:{
        type:String,
        required:[true,"Please add the email"],
        unique:[true,"Email already taken"]

    },
    password:{
        type:String,
        required:[true,"Please add the user password"],
    },
},{
    timestamps:true
}
);

module.exports=mongoose.model("User",userSchema);