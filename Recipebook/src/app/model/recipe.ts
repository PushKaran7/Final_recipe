import { IIngredient } from "./ingredient";


export interface IRecipe {
    recipeId: string;  
    title: string;    
    time_to_prepare: number; 
    ingredients: IIngredient[];  
    description?: string;  
    author?: string;       // Optional author of the recipe
    created_date?: Date;   // Date of creation, default can be handled in logic
    thumbnail_url?: string;
}
