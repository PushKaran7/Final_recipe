import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeService } from '../../app/services/recipe.service';
import { IRecipe } from '../../app/model/recipe';
import { AuthService } from '../../app/services/auth.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { AddEditCardComponent } from '../add-edit-card/add-edit-card.component';
import { RecipeInfoComponent } from '../recipe-info/recipe-info.component';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit{

  recipeItem:IRecipe[]=[];

  filteredRecipe: IRecipe[] = [];


  links=[
    {path:'/home',name:'Recipe List'},
    {path:'/shopping-cart',name:'Shopping Cart'},
    
  ];

  activeLink = this.links[0].name;

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
        this.filteredRecipe=val;

        console.log("Initial filtered Recipe-->",this.filteredRecipe);


        console.log("Getting all recipes-->",val);

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

  displayRecipe(recipeId:string){
    this._dialog.open(RecipeInfoComponent,{
      data:{recipeId:recipeId}
    })
  }

  searchRecipe(event:Event){
    const input=(event.target as HTMLInputElement).value;
    if(!input){
      this.filteredRecipe=this.recipeItem;
      return 
    }
   this.filteredRecipe=this.recipeItem.filter(
    (item)=>item?.title.toLowerCase().includes(input.toLowerCase())
    );

  }


}
