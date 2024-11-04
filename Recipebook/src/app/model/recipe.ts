import { IIngredient } from "./ingredient";


export interface IRecipe {
    recipeId: string;  
    title: string;    
    time_to_prepare: number; 
    ingredients: IIngredient[];  
    description?: string;  
    author?: string;      
    created_date?: Date;   
    thumbnail_url?: string;
}
