const express=require("express");
const validateToken =require("../middleware/validateTokenHandler");

const { registerUser, loginUser, currentUser } = require("../controller/userController");

const router = express.Router();

router.post("/register",registerUser);

router.post("/login",loginUser);


//this is Private route caused i have used middleware validateToken
router.get("/current",validateToken,currentUser);

module.exports=router;