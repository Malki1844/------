import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { RecipeService } from '../../../recipe.service';
import { Recipe } from '../../../models/recipe.model';
import { CategoryService } from '../../../category.service';
import { User } from '../../../models/user.model';
import { UserService } from '../../../user.service';
@Component({
  selector: 'app-details-recipe',
  templateUrl: './details-recipe.component.html',
  styleUrl: './details-recipe.component.scss'
})
export class DetailsRecipeComponent implements OnInit{
  public idRecipe!:number
  constructor(private _route: ActivatedRoute,private _router: Router, private _recipeService: RecipeService, private _categoryService: CategoryService,private _userService: UserService){ }
  public recipeObj!:Recipe
  public category:string=""
  public categoryName:string=""
  public isAuthor!:boolean
  public name!:string
  public code!:number
  public isEdit=false
  
  
  ngOnInit(): void {
    this._route.params.subscribe((param)=>{
    this.idRecipe=param['id'];
    console.log(this.idRecipe)
    })
    
    this._recipeService.get_recipe_by_id(this.idRecipe).subscribe({
      next:(res)=> {
      this.recipeObj=res
        console.log('Recipe added successfully:', res);
        this._categoryService.get_category_by_id(this.recipeObj.categoryCode).subscribe({
          next:(res)=>{
          this.category=res.url
          this.categoryName=res.name
          },
          error:(error)=>{
            console.log(error);
          }
        })
        this._userService.get_user_byId(this.recipeObj.userCode).subscribe({
          next:(res)=>{
          this.name=res.name
          this.code-res.code
          console.log(this.name)
          console.log(res.name)
          
          },
          error:(err)=>{
          console.log("error")
          }
        })
      },
      error:(err) =>{
        console.log('Error adding recipe:', err);
      }
    })
    
    const currentUserString=sessionStorage.getItem("currentUser");
    if(currentUserString){
      const currentUser=JSON.parse(currentUserString);
      if(currentUser.code==this.recipeObj.userCode){
        this.isAuthor=true
        console.log(currentUser.code)
        console.log(this.recipeObj.userCode)
      }
    }
}
getStarRating(difficulty: number): string {
  let stars = '';
  const fullStar = '⭐'; 
  const emptyStar = '☆'; 
  
  for (let i = 0; i < difficulty; i++) {
    stars += fullStar;
  }
  for (let i = difficulty; i < 5; i++) {
    stars += emptyStar;
  }
  return stars;
}
deleteRecipe(){
  this._recipeService.delete_recipe(this.idRecipe).subscribe({
    next:(res)=> {
      console.log('Recipe deleted successfully:', res);
      this._router.navigate(["recipes/all"])
    },
    error:(err)=>{
      console.log(err)
    }})
}

  IsAuthor(){
  const currentUserString=sessionStorage.getItem("currentUser");
  if(currentUserString){
    const currentUser=JSON.parse(currentUserString);
    if(currentUser.code==this.recipeObj.userCode){
      this.isAuthor=true
      console.log(currentUser.code)
      console.log(this.recipeObj.userCode)
      return true;
    }
    
  }
  return false;
}
updateRecipe(){
  this._router.navigate(["recipes/edit",this.recipeObj.recipeCode])
}
}
