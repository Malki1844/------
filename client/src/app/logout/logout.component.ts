import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { Router } from '@angular/router';

@Component({
  selector: 'app-logout',
  standalone: true,
  imports: [MatButtonModule],
  templateUrl: './logout.component.html',
  styleUrl: './logout.component.scss'
})
export class LogoutComponent {
  constructor( private _router: Router) {}
public out(){
  if (sessionStorage.getItem("currentUser")) {
    sessionStorage.removeItem("currentUser");
    this._router.navigate(['/login']);
  }
}
}
