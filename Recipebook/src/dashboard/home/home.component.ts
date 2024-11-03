import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecipeService } from '../../app/services/recipe.service';
import { IRecipe } from '../../app/model/recipe';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent implements OnInit{


  constructor(
    private router: Router,
    private _apiVal:RecipeService
  ){

  }

  ngOnInit(): void {
    this.loadRecipe();
    
  }

  loadRecipe(){
    this._apiVal.getAllRecipe().subscribe({
      next:(val: IRecipe[])=>{

        console.log("this is the value-->",val);

      },
      error:(err)=>{
        console.log("this is the error-->",err);
      }
    })
  }



}
