import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeService } from '../../app/services/recipe.service';
import { IRecipe } from '../../app/model/recipe';
import { AuthService } from '../../app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { AddEditCardComponent } from '../add-edit-card/add-edit-card.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  recipeItem:IRecipe[]=[];
  constructor(
    private router: Router,
    private _apiVal:RecipeService,
    private _auth:AuthService,
    private snackBar: MatSnackBar,
    private _dialog:MatDialog,
  ){

  }

  ngOnInit(): void {
    this.loadRecipe();
    
  }

  loadRecipe(){
    this._apiVal.getAllRecipe().subscribe({
      next:(val: IRecipe[])=>{
        this.recipeItem=val;


        console.log("this is the value-->",val);

      },
      error:(err)=>{
        console.log("this is the error-->",err);
      }
    })
  }

  logoutFunc(){
    this._auth.logout();
    this.snackBar.open("User Logged Out", 'Ok', {
      duration: 3000,
      horizontalPosition: 'center', 
      verticalPosition: 'top',
    });
    this.router.navigate(['/login']);
    console.log("User Logged out");
  }

  addRecipe(){
      this._dialog.open(AddEditCardComponent);
  }

  displayRecipe(){
    
  }


}
