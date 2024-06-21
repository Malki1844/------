import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, Validators } from '@angular/forms';
import { Recipe } from '../../../models/recipe.model';
import { Router } from '@angular/router';
import { RecipeService } from '../../../recipe.service';
import { DatePipe } from '@angular/common';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-recipe',
  templateUrl: './add-recipe.component.html',
  styleUrls: ['./add-recipe.component.scss']
})
export class AddRecipeComponent implements OnInit {
  recipeForm: FormGroup;
  constructor(private datePipe: DatePipe,private _router: Router, private _recipeService: RecipeService, private fb: FormBuilder) {
    this.recipeForm = this.fb.group({
      recipeName: ['', [Validators.minLength(3), Validators.required]],
      categoryCode: ['', [Validators.required]],
      preparation: ['', [Validators.required]],
      difficulty: ['', [Validators.required,Validators.min(1), Validators.max(5)]],
      ingredients: this.fb.array([]),
      instructions: this.fb.array([]),
      image: ['', [Validators.required]]
    });
  }
  updateCategoryCode(event: any) {
    const target = event.target as HTMLSelectElement;
    const selectedValue = target.value;
    this.recipeForm.controls['categoryCode'].setValue(selectedValue);
  }
  ngOnInit(): void {
    this.addIngredient()
    this.addInstruction()
  }
  get ingredients(): FormArray {
    return this.recipeForm.get('ingredients') as FormArray;
  }
  get instructions(): FormArray {
    return this.recipeForm.get('instructions') as FormArray;
  }
  check(i: number) {
    if (this.ingredients.at(i).get('ingredient')?.value == '' && i < this.ingredients.length - 1) {
      this.removeIngredient(i)
    }
    else if (this.ingredients.at(i).get('ingredient')?.value != '' && i == this.ingredients.length - 1) {
      this.addIngredient()
    }
  }
  check2(i: number) {
    if (this.instructions.at(i).get('instruction')?.value == '' && i < this.instructions.length - 1) {
      this.removeInstruction(i)
    }
    else if (this.instructions.at(i).get('instruction')?.value != '' && i == this.instructions.length - 1) {
      this.addInstruction()
    }
  }
  newIngredient(): FormGroup {
    return this.fb.group({
      ingredient: ['', Validators.required]
    });
  }
  newInstruction(): FormGroup {
    return this.fb.group({
      instruction: ['', Validators.required]
    });
  }
  addIngredient() {
    this.ingredients.push(this.newIngredient());
  }
  addInstruction() {
    this.instructions.push(this.newInstruction());
  }
  removeIngredient(i: number) {
    this.ingredients.removeAt(i);
  }
  removeInstruction(i: number) {
    this.instructions.removeAt(i);
  }
  onSubmit() {
    if (sessionStorage.getItem("currentUser")){
  
    if (this.recipeForm.controls) {
      let recipe: Recipe = this.recipeForm.value;
      recipe.ingredients = this.ingredients.controls.slice(0, -1).map(control => control.value.ingredient);
      recipe.dateAdded = this.datePipe.transform(new Date(), 'yyyy-MM-dd');
      console.log(recipe.dateAdded)
      console.log(recipe.instructions)
      recipe.instructions=this.instructions.controls.slice(0, -1).map(control => control.value.instruction);
      const currentUserString = sessionStorage.getItem("currentUser");
      if (currentUserString) {
        const currentUser = JSON.parse(currentUserString);
        recipe.userCode = currentUser.code;
      }
      else {
        console.error('currentUser is null or undefined');
        this._router.navigate(["login"]);
      }
    this._recipeService.post_recipe(recipe).subscribe({
      next: res => {
        Swal.fire(
          'Good job!',
          'Recipe added successfully!',
          'success'
        ).then(()=>{
          this._router.navigate(["/recipes/all"])
        })
        console.log('Recipe added successfully:', res);
      },
      error: err => {
        console.error('Error adding recipe:', err);
        Swal.fire(
          'Oops!',
          "Error adding recipe!",
          'error'
        );
      }
    });
  } 
  else {  
      Object.keys(this.recipeForm.controls).forEach(key => {
        const controlErrors = this.recipeForm.get(key)?.errors;
        if (controlErrors != null) {
          Object.keys(controlErrors).forEach(keyError => {
            console.error('Form control:', key, 'has error:', keyError);
          });
        }
      });
      alert("invalid form!")
    }
  }
  else{
    alert("you didn't log in")
    this._router.navigate(["login"]);
  }
}

}