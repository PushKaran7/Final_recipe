import { Component } from '@angular/core';
import { FormArray, FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { RecipeService } from '../../app/services/recipe.service';

@Component({
  selector: 'app-add-edit-card',
  templateUrl: './add-edit-card.component.html',
  styleUrls: ['./add-edit-card.component.scss']
})
export class AddEditCardComponent {


  recipeForm:FormGroup;

 


  constructor(private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<AddEditCardComponent>,
    private _recipe:RecipeService
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

  get ingredients(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray;
  }

  addIngredient() {
    const ingredientGroup = this._fb.group({
      name: '',
      quantity: 0
    });
    this.ingredients.push(ingredientGroup); 
  }


  onRecipeSubmit(){
    if(this.recipeForm.valid)
    {
      console.log("Newly added recipe is --->",this.recipeForm.value);
      this._recipe.addRecipe(this.recipeForm.value).subscribe({
        next: (val: any) => {
    
          alert('Employee added succesfully');
          console.log("this is what the val is", val);
          this._dialogRef.close(true);
        },
        error: (err) => {
          console.log(err);
  
        },
      })
    }
    

  }


  closeit(){
    this._dialogRef.close();
    
  }
}
