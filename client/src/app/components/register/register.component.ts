import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { User } from '../../models/user.model';
import { UserService } from '../../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {MatIconModule} from '@angular/material/icon';
import { MatFormFieldModule } from '@angular/material/form-field';

const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{5,}$/;

const passwordPatternValidator = (): ValidatorFn => {
  return (control: AbstractControl): { [key: string]: boolean } | null => {
    if (!control.value || regexPassword.test(control.value)) {
      return null;
    }
    return { passwordGood: true };
  };
};
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule,MatInputModule, MatButtonModule, MatCardModule,
    MatIconModule,MatFormFieldModule ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {
  public user: User = new User()
  public usersList!: User[]
  constructor(private _userService: UserService, private _router: Router, private _route: ActivatedRoute) { }
  ngOnInit(): void {
    this._route.params.subscribe((param) => {
      this.user.name = param['name'];
    })
    this._userService.get_users().subscribe({
      next: (res) => {
        this.usersList = res;
      },
      error: () => {
        this.usersList = []
      }
    })
  }
  registerForm: FormGroup = new FormGroup({
    "name": new FormControl("",[Validators.minLength(3), Validators.required]),
    "email": new FormControl("",[Validators.required]),
    "address": new FormControl("",[Validators.required]),
    "password": new FormControl("", [Validators.required, passwordPatternValidator()]) 
  });

  public onSubmit() {
    if (!this.usersList.some(u => u.name === this.user.name)) {
      console.log(this.usersList)

      this._userService.add_user(this.user).subscribe({
        next: (res) => {
          console.log(this.usersList)
          alert(`${this.user.name}, we signed you up successfully!`)
          sessionStorage.setItem("currentUser", JSON.stringify(res));
          this._router.navigate(["recipes/all"])
        },
        error: (err) => {
          console.log(err)
        }
      })
    }
    else{
      console.log(`name ${this.user.name} is already exist. try another one.`)
    }
  }

  public registerUser: FormGroup = new FormGroup({
    "name": new FormControl("", [Validators.required, Validators.minLength(2)]),
    "address": new FormControl("",[Validators.required]),
    "email": new FormControl("", [Validators.required]),
    "password": new FormControl("", [Validators.required]),
  })
}

