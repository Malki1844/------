import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { RegisterComponent } from './components/register/register.component';
import { NavComponent } from './components/nav/nav.component';
import { LogoutComponent } from './logout/logout.component';
export const routes: Routes = [
    // {path:'', redirectTo: 'home', pathMatch: 'full'},
    // {path: 'home', component: NavComponent},
    {path:'', redirectTo: 'login', pathMatch: 'full'},
    {path: 'logout', component:LogoutComponent },
    {path:'login', component: LoginComponent},
    {path:'register', component: RegisterComponent}, 
    {path:'register/:name', component: RegisterComponent}, 
    {path:'recipes', loadChildren:()=>import('./recipe/recipe.module').then(c=>c.RecipeModule)}, 
    {path:'**', component: NotFoundComponent},
    
];
