import { Component } from '@angular/core';
import { RecipeService } from '../../../recipe.service';
import { Recipe } from '../../../models/recipe.model';
import { Router } from '@angular/router';
import { Category } from '../../../models/category.model';
import { FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-all-recipes',
  templateUrl: './all-recipes.component.html',
  styleUrl: './all-recipes.component.scss',

})
export class AllRecipesComponent {

  public rangeValue: number = 100;
  public min: number = 0;
  public max: number = 200;

  allSearch = [
    { value: 'name', viewValue: 'לפי שם' },
    { value: 'range', viewValue: 'עד כמה זמן הכנה' },
    { value: 'category', viewValue: 'לפי קטגוריה' },
    { value: 'no', viewValue: 'ללא ' },
  ];
  public isName: boolean = false
  public isRange: boolean = false
  public isCategory: boolean = false
  onRangeChange(event: any): void {
    this.rangeValue = event.target.value;
    this.recipeSearch = this.recipesList.filter((recipe) =>
      recipe.preparation <= this.rangeValue
    )
  }
  public inputName: string = "";
  public inputNum!: number;

  public recipesList: Recipe[] = []
  public recipeSearch!: Recipe[];
  public categoryForm!: FormGroup;
  constructor(private _recipeService: RecipeService, private _router: Router) {
    this.categoryForm = new FormGroup({
      categoryCode: new FormControl('') // Initialize the form control
    });
    console.log(this.recipesList)
    this._recipeService.get_recipes().subscribe({
      next: (res) => {
        this.recipeSearch = this.recipesList = res
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  public addRecipe() {
    this._router.navigate(["recipes/add"])
  }
  public search() {
    const searchValue = this.inputName.toLowerCase();
    this.recipeSearch = this.recipesList.filter((recipe) =>
      recipe.recipeName.toLowerCase().includes(searchValue)
    );
    this.inputName = ""
  }


  public searchCategory(event: any) {
    const selectedValue = event.source.value; // Access the selected value from the source property
    if (selectedValue) {
      this.recipeSearch = this.recipesList.filter((recipe) =>
        recipe.categoryCode === Number(selectedValue)
      );

    }
  }

  public onSelectionChange(event: any) {
    const selectedValue = event.value;
    if (selectedValue === 'name') {
      this.isName = true
      this.isRange = false
      this.isCategory = false
    } else if (selectedValue === 'range') {
      this.isName = false
      this.isRange = true
      this.isCategory = false
    } else if (selectedValue === 'category') {
      this.isName = false
      this.isRange = false
      this.isCategory = true
    }
    else {
      this.isName = false
      this.isRange = false
      this.isCategory = false
      this.recipeSearch = this.recipesList
    }
  }
}