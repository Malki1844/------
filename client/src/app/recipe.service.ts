import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Recipe } from './models/recipe.model';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  private baseURL="http://127.0.0.1:3000/Recipe"
  public recipes: Observable<Recipe[]>|undefined
  constructor(private _http:HttpClient) { }
  get_recipes():Observable<Recipe[]>{
    if(!this.recipes){
    this.recipes = this._http.get<Recipe[]>(this.baseURL)
    }
    return  this.recipes;
  }
  post_recipe(recipe: Recipe):Observable<Recipe>{
    const headers = new HttpHeaders().set('Content-Type', 'application/json');
    let newRecipe= this._http.post<Recipe>(this.baseURL, recipe)
    this.recipes =undefined;
    return newRecipe
  }
  put_recipe(recipe: Recipe):Observable<Recipe>{
    let updateRecipe= this._http.put<Recipe>(`${this.baseURL}/${recipe.recipeCode}`, recipe)
    this.recipes =undefined;
    return updateRecipe;
  }
  delete_recipe(id:number):Observable<Recipe>{
    return this._http.delete<Recipe>(`${this.baseURL}/${id}`)
  }
    get_recipe_by_id(id: number):Observable<Recipe>{
    return this._http.get<Recipe>(`${this.baseURL}/${id}`);
  }
}
