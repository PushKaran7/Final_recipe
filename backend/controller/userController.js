const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const registerUser = asyncHandler(async (req, res) => {
    const {  email, password } = req.body;

    if ( !email || !password) {
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const userAvailable = await User.findOne({ email });
    if (userAvailable) {
        res.status(400);
        throw new Error("User/email already registerd!!");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    console.log("Hashed Password--->", hashedPassword);

    const user = await User.create({
        email,
        password: hashedPassword,
    });

    console.log(`User created ${user}`);
    if (user) {
        res.status(201).json({ _id: user.id, email: user.email });
    }
    else {
        res.status(400);
        throw new Error("User data is not valid");
    }



});

const loginUser = asyncHandler(async (req, res) => {
    const { email, password } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("All fields are required");
    }

    const user = await User.findOne({ email });
    console.log("this is user entered password", password);
    console.log("this is the user stored password", user.password);
    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
              
                email: user.email,
                id: user.id
            },
        },
            process.env.ACCESS_TOKEN,
            { expiresIn: "5h" }
        );

        res.status(200).json({accessToken});

    }
    else{
        res.status(401);
        throw new Error("email or password not valid");
    }
 
});


const currentUser = asyncHandler(async (req, res) => {
    res.json({message:"I am inside Ccurrent user"});
    
   
})
module.exports = { registerUser, loginUser, currentUser };