import { Injectable } from '@angular/core';
import {User} from "../users/user";
import {Observable} from "rxjs";

@Injectable()
export class AuthService {
  users : User[];

  constructor() {
    this.users = [
      {username: 'lbilde', password:'123', email:'cheese@namnam.dk'},
      {username: 'ljb', password:'123', email:'cheese22@namnam22.dk'},
      {username: 'ilikechokolate', password:'123', email:'cheese33@namnam33.dk'}
    ];
  }

  login(username, password) : Observable<User>{
    let userAccepted = this.users
      .filter(x => x.username === username)
      .filter(y => y.password === password);
    if(userAccepted && userAccepted.length === 1){
      localStorage.setItem('currentUser', JSON.stringify({ token: "jwt will come later", username: userAccepted[0].username }));
      return Observable.of(userAccepted[0]);
    } else {
      return Observable.of(null);
    }
  }

  currentUser(){
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  logout(){
    return localStorage.removeItem('currentUser');
  }

}
