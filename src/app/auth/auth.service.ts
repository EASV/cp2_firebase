import { Injectable } from '@angular/core';
import {User} from "../users/user";
import {Observable} from "rxjs";

@Injectable()
export class AuthService {
  constructor() {}

  login(email, password){

  }

  currentUser(){
    return JSON.parse(localStorage.getItem('currentUser'));
  }

  logout(){
    return localStorage.removeItem('currentUser');
  }

}
