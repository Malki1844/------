import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../../models/recipe.model';
import { Router } from '@angular/router';
import { CategoryService } from '../../../category.service';

@Component({
  selector: 'app-small-recipe',
  templateUrl: './small-recipe.component.html',
  styleUrl: './small-recipe.component.scss'
})
export class SmallRecipeComponent implements OnInit {

  @Input()
  public recipe!: Recipe

  constructor(private _router: Router, private _categoryService: CategoryService) {
    console.log(this.recipe)

  }
  public category: string = ""
  public categoryName: string = ""
  ngOnInit(): void {
    this._categoryService.get_category_by_id(this.recipe.categoryCode).subscribe({
      next: (res) => {
        this.category = res.url
        this.categoryName = res.name
      },
      error: (error) => {
        console.log(error);
      }
    })
  }

  showDetails() {
    if (sessionStorage.getItem("currentUser"))
      this._router.navigate(["recipes/details", this.recipe.recipeCode])
    else {
      const move = confirm("לא נכנסת לאתר האם לעבור לדף הכניסה?")
      if (move) {
        this._router.navigate(['/login']);
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
  model: any;

  // public get productRating(): string {
  //     const rating = this.product.AverageRating +
  //         ((this.product.UserRating || this.product.AverageRating) - this.product.AverageRating) /
  //         (this.product.TotalReviews + 1);
  //     return rating.toFixed(1);
  // }
}
