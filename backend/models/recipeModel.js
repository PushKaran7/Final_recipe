const mongoose=require("mongoose");

const ingredientSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: true 
    },    
    quantity: { 
        type: Number, 
        required: true 
    }    
  }
);




const recipeSchema=mongoose.Schema({
    recipeId: { 
        type: String, 
        required: true, 
        unique: true,
        match: /^[a-zA-Z0-9]+$/ 
    }, 
    title: { 
        type: String, 
        required: true 
    },                  
    time_to_prepare: { 
        type: Number, 
        required: true 
    },        
    ingredients: [ingredientSchema],                          
    description: { 
        type: String 
    },                            
    author: { 
        type: String 
    },                                 
    created_date: { 
        type: Date, 
        default: Date.now 
    },          
    thumbnail_url: { 
        type: String 
    }  

}
);

const Ingredients=mongoose.model("Ingredients", ingredientSchema);
const Recipe=mongoose.model("Recipe",recipeSchema);

module.exports={Recipe,Ingredients};
