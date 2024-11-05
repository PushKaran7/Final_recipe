const express=require("express");
const validateToken = require("../middleware/validateTokenHandler");
const { getCartItem, addCartItem, updateCartItem, deleteCartItem } = require("../controller/cartController");

const router=express.Router();

router.use(validateToken);

router.route("/").get(getCartItem);

router.route("/").post(addCartItem);

router.route("/:id").put(updateCartItem);

router.route("/:id").delete(deleteCartItem);

module.exports=router;