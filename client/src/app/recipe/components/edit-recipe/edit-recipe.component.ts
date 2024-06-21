import { Component, Input, Output,EventEmitter, OnInit } from '@angular/core';
import { RecipeService } from '../../../recipe.service';
import { UserService } from '../../../user.service';
import { Recipe } from '../../../models/recipe.model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-edit-recipe',
  templateUrl: './edit-recipe.component.html',
  styleUrls: ['./edit-recipe.component.scss'] 
})
export class EditRecipeComponent implements OnInit {
  @Input()
  public recipeSave!: Recipe
  public recipeChange!:Recipe;
  @Output() OnEdit: EventEmitter<boolean> = new EventEmitter<boolean>();
  ngOnInit(): void {
    this.recipeChange = JSON.parse(JSON.stringify(this.recipeSave));
  }
  constructor(
    private _recipeService: RecipeService, private _userService: UserService, private _route: ActivatedRoute) {}
  updateRecipe() {
    console.log(this.recipeChange)
    this._recipeService.put_recipe(this.recipeChange).subscribe({
      next: (res) => {
        console.log('Recipe updated successfully');
        this.recipeSave.difficulty=res.difficulty;
        this.recipeSave.image=res.image;
        this.recipeSave.ingredients=res.ingredients;
        this.recipeSave.instructions=res.instructions;
        this.recipeSave.recipeName=res.recipeName;
      },
      error: (err) => {
        console.log(err);
      }
    });
    this.OnEdit.emit(false)
  }
  cancelChange(){
    
    this.OnEdit.emit(false)
  }
  trackByIndex(index: number, item: any): any {
    return index;
  }
  
}
