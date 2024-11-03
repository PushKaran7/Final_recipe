import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRecipe } from '../model/recipe';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  baseUrl='http://localhost:8000/api/recipes';

  constructor(private _http:HttpClient) { 

  }

  getAllRecipe():Observable<IRecipe[]>{
    console.log("i am inside getAllRecipe service");
    return this._http.get<IRecipe[]>(this.baseUrl);
  }
}
