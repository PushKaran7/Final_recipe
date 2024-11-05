import { Component, Inject, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { RecipeService } from '../../app/services/recipe.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-add-edit-card',
  templateUrl: './add-edit-card.component.html',
  styleUrls: ['./add-edit-card.component.scss']
})
export class AddEditCardComponent implements OnInit {


  recipeForm:FormGroup;
  

 


  constructor(private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<AddEditCardComponent>,
    private _recipe:RecipeService,
    private snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data: any
  ){
    this.recipeForm=_fb.group({
      title: ''   ,
      time_to_prepare:'', 
      ingredients:this._fb.array([]),
      description: '',  
      author:''      ,
       
      thumbnail_url:''

    });

    
  }

  ngOnInit(): void {
    if (this.data) {
      //this here is Prefilling the existing data
      this.recipeForm.patchValue(this.data);
      // filling ingredients into name and quantity indiviaually
      this.data.ingredients?.forEach((ingredient: any) => this.addIngredient(ingredient));
    }
  }

  get ingredients(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  // addIngredient(ingredient: any= { name: '', quantity: 0 }) {
  //   const ingredientGroup = this._fb.group({
  //     name: '',
  //     quantity: 0
  //   });
  //   this.ingredients.push(ingredientGroup); 
  // }

  addIngredient(ingredient: any = { name: '', quantity: 0 }) {
    const ingredientGroup = this._fb.group({
      name: ingredient.name,
      quantity: ingredient.quantity
    });
    this.ingredients.push(ingredientGroup);
  }


  onRecipeSubmit(){
    if(this.recipeForm.valid)
    {
     if(this.data)
     {
      this._recipe.editRecipe(this.data.recipeId,this.recipeForm.value).subscribe({
        next: (val: any) => {

          this.snackBar.open("Recipe Updated", 'Ok', {
            duration: 3000,
            horizontalPosition: 'center', 
            verticalPosition: 'top',
          });
          console.log("this is what the  updated val is", val);
          this._dialogRef.close(true);
        },
        error: (err) => {
          console.log(err);

        },
      })

     }
     else{
      console.log("Newly added recipe is --->",this.recipeForm.value);
      this._recipe.addRecipe(this.recipeForm.value).subscribe({
        next: (val: any) => {
    
          this.snackBar.open("New Recipe Added Succesfully!!!", 'Ok', {
            duration: 3000,
            horizontalPosition: 'center', 
            verticalPosition: 'top',
          });
          console.log("this is what the val is", val);
          this._dialogRef.close(true);
        },
        error: (err) => {
          console.log(err);
  
        },
      })
     }
    }
    

  }


  closeit(){
    this._dialogRef.close();
    
  }
}
