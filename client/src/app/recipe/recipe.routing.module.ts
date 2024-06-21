import { NgModule } from '@angular/core';
import { DetailsRecipeComponent } from './components/details-recipe/details-recipe.component';
import { AllRecipesComponent } from './components/all-recipes/all-recipes.component';
import { EditRecipeComponent } from './components/edit-recipe/edit-recipe.component';
import { SmallRecipeComponent } from './components/small-recipe/small-recipe.component';
import { RouterModule, Routes } from '@angular/router';
import { AddRecipeComponent } from './components/add-recipe/add-recipe.component';

const recipeRouts:Routes=[
{path: 'all', component: AllRecipesComponent},
{path: 'small', component: SmallRecipeComponent},
{path: 'details/:id', component: DetailsRecipeComponent},
{path: 'edit/:id', component: EditRecipeComponent},
{path: 'add', component: AddRecipeComponent}
]

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(recipeRouts)
  ] 
})
export class RecipeRoutingModule { }
