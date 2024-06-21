import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from './models/user.model';


@Injectable({
  providedIn: 'root'
})
export class UserService {

private baseURL ="http://127.0.0.1:3000/User"
  constructor(private _http: HttpClient) { }

   get_users():Observable<User[]>{
    return this._http.get<User[]>(this.baseURL)
   }

  add_user(user:User):Observable<User>{
    return this._http.post<User>(this.baseURL, user )
  }
  get_user_byId(id: number):Observable<User>{
    return this._http.get<User>(this.baseURL + "/" + id )
  }
}
