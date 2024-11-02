const express=require("express");
const { getAllRecipe, createRecipe, updateRecipe, deleteRecipe, getOneRecipe } = require("../controller/recipeController");
const validateToken = require("../middleware/validateTokenHandler");

const router=express.Router();


//I am setting Private routes here

router.use(validateToken);

router.route("/").get(getAllRecipe);

router.route("/:id").get(getOneRecipe);

router.route("/").post(createRecipe);

router.route("/:id").put(updateRecipe);

router.route("/:id").delete(deleteRecipe);

module.exports=router;