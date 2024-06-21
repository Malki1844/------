import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { DetailsRecipeComponent } from './components/details-recipe/details-recipe.component';
import { AllRecipesComponent } from './components/all-recipes/all-recipes.component';
import { EditRecipeComponent } from './components/edit-recipe/edit-recipe.component';
import { SmallRecipeComponent } from './components/small-recipe/small-recipe.component';
import { RecipeRoutingModule } from './recipe.routing.module';
import { FormsModule,ReactiveFormsModule } from "@angular/forms";
import { AddRecipeComponent } from './components/add-recipe/add-recipe.component';
import {MatIconModule} from '@angular/material/icon';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { MatCardModule } from '@angular/material/card';
import {MatListModule} from '@angular/material/list';

import {
  IgxButtonModule,
  IgxCardModule,
  IgcFormsModule,
  IgxIconModule
} from "igniteui-angular";
import { Recipe } from '../models/recipe.model';
import { TimePipe } from "../time.pipe";


@NgModule({
  providers: [DatePipe],
    bootstrap: [SmallRecipeComponent],
    declarations: [AllRecipesComponent, AddRecipeComponent, DetailsRecipeComponent, EditRecipeComponent, SmallRecipeComponent],
    imports: [
        CommonModule, RecipeRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        IgxButtonModule,
        IgxCardModule,
        IgcFormsModule,
        IgxIconModule,
        TimePipe,
        MatButtonModule,
        MatDividerModule,
        MatIconModule,
        MatInputModule,
        MatFormFieldModule,
        MatSelectModule,
        MatCardModule,
        MatListModule
    ]
})
export class RecipeModule { }
