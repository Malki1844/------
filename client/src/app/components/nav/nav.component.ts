import { Component } from '@angular/core';
import { RouterModule,Router } from '@angular/router';
import { NgModule } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-nav',
  standalone: true,
    imports: [RouterModule,
      MatToolbarModule,
      MatButtonModule,
    MatIconModule],
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.scss'
})
export class NavComponent {
  constructor(private _router:Router){}
public navigateRecipes(){
this._router.navigate(['/recipes/all'])
}
}
