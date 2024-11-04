const asyncHandler = require("express-async-handler");

const { Recipe, Ingredients } =require("../models/recipeModel");
const { v4: uuidv4 } = require("uuid");

const getAllRecipe = asyncHandler(async (req, res) => {
    console.log("I am in getAllRecipe");
    const item = await Recipe.find();
    res.status(200).json(item);
});

const getOneRecipe= asyncHandler(async (req, res) => {
    console.log("I am in getOneRecipe");
    const item = await Recipe.findOne({recipeId:req.params.recipeId});
    res.status(200).json(item);
});

const createRecipe = asyncHandler(async (req, res) => {

    const uniqueId = uuidv4().replace(/-/g, '');

    const { recipeId, title, time_to_prepare, ingredients, description, author, created_date, thumbnail_url } = req.body;

    if (!title || !ingredients) {
        return res.status(400).json({ message: "Title and ingredients are required." });
    }

    try {
        const item = await Recipe.create({
            recipeId: uniqueId,
            title,
            time_to_prepare,
            ingredients,
            description,
            author,
            created_date,
            thumbnail_url



        });
        res.status(201).json({ message: "New Recipe Created", item });
        console.log("New Recipe is -->", item);

    }
    catch (err) {
        console.error("Error creating recipe:", error.message);
        res.status(500).json({ message: "Error saving recipe to the database." });
    }
});

const updateRecipe = asyncHandler(async (req, res) => {

    try {
        console.log("i am in update recipe ");
        const item = await Recipe.findOneAndUpdate(
            { recipeId: req.params.recipeId},
            req.body,
            { new: true }
        );

        if (!item) {
            return res.status(404).json({ message: 'Recipe not found' });
        }
        res.status(200).json(item);


    }
    catch(err){
        res.status(400).json({ message: error.message });
    }
});

const deleteRecipe=asyncHandler(async (req,res)=>{
   try{
    
    const item= await Recipe.findOne({recipeId:req.params.recipeId});
    if(!item){
        res.status(404).json({message:"Recipe NOt Found!"});
    }
    await Recipe.findOneAndDelete({recipeId:req.params.id})
    res.status(200).json({message:"Deleted the Recipe",item});
   }
   catch (error) {
    res.status(500).json({ message: error.message });
}

});

module.exports={getAllRecipe,createRecipe,updateRecipe,deleteRecipe,getOneRecipe};