import { Injectable } from '@angular/core';

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
