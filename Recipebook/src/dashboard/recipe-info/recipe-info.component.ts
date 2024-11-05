import { Component, Inject, OnInit } from '@angular/core';
import { RecipeService } from '../../app/services/recipe.service';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { IRecipe } from '../../app/model/recipe';
import { AddEditCardComponent } from '../add-edit-card/add-edit-card.component';
import { CartService } from '../../app/services/cart.service';


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
    private _recipe: RecipeService,
    private dialog: MatDialog,
    private _cart: CartService

  ) {

  }

  ngOnInit(): void {
    this.getRecipeDetails(this.data.recipeId);
  }

  getRecipeDetails(recipeId: string) {
    this._recipe.getOneRecipe(recipeId).subscribe({
      next: (recipe: IRecipe) => {
        this.recipeDetails = recipe;
        console.log("Recipe details:", recipe);
      },
      error: (err) => console.error("Error fetching recipe details:", err)

    });

  }

  editRecipeDetails() {
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

  deleteRecipeItem() {
    this._recipe.deleteRecipe(this.data.recipeId).subscribe({
      next: (val: any) => {

        alert("Deleted Recipe!!!");
        console.log("Recipe deleted response:", val);


      },
      error: (err) => console.error("Error Deleting Recipe-->", err)
    })

  }

  addToCart(recipeDetails: IRecipe) {
    if (recipeDetails && recipeDetails.ingredients) {
      recipeDetails.ingredients.forEach(ingredient => {
       
        const cartItem = {
         
          name: ingredient.name,
          quantity: ingredient.quantity
        };


        this._cart.addCartItems(cartItem).subscribe({
          next: (response) => console.log(`Added ${ingredient.name} to cart`, response),
          error: (error) => console.error(`Error adding ${ingredient.name} to cart`, error)
        });
      });
      alert("All ingredients added to cart!");
    }
  }


}

  


