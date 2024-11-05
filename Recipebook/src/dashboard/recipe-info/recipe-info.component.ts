import { Component, Inject, OnInit } from '@angular/core';
import { RecipeService } from '../../app/services/recipe.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { IRecipe } from '../../app/model/recipe';
import { AddEditCardComponent } from '../add-edit-card/add-edit-card.component';


@Component({
  selector: 'app-recipe-info',
  templateUrl: './recipe-info.component.html',
  styleUrl: './recipe-info.component.scss'
})
export class RecipeInfoComponent implements OnInit {

  recipeDetails: IRecipe | null = null;
  snackBar: any;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { recipeId: string },
    private _recipe:RecipeService,
    private dialog: MatDialog
    
  ){

  }

  ngOnInit(): void {
    this.getRecipeDetails(this.data.recipeId);
  }

  getRecipeDetails(recipeId:string){
    this._recipe.getOneRecipe(recipeId).subscribe({
      next: (recipe: IRecipe) => {
        this.recipeDetails = recipe;
        console.log("Recipe details:", recipe);
      },
      error: (err) => console.error("Error fetching recipe details:", err)
    
    });

  }

  editRecipeDetails(){
    if (this.recipeDetails) {
      const dialogRef = this.dialog.open(AddEditCardComponent, {
        width: '600px',
        data: { ...this.recipeDetails } 
      });

      dialogRef.afterClosed().subscribe(result => {
        if (result) {
          
          this.getRecipeDetails(this.data.recipeId);
        }
      });
    }


  }

  deleteRecipeItem(){
    this._recipe.deleteRecipe(this.data.recipeId).subscribe({
      next:(val:any)=>{

        alert("Deleted Recipe!!!");
        console.log("Recipe deleted response:", val);
       
       
      },
      error: (err) => console.error("Error Deleting Recipe-->", err)
    })

  }

  

}
