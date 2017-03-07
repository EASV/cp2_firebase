import { Injectable } from '@angular/core';
import {AngularFire} from "angularfire2";
import {Observable} from "rxjs";
import {User} from "./user";

@Injectable()
export class UserService {

  constructor(private af : AngularFire) { }

  getUsers() : Observable<User[]>{
    this.af.database.list('users').subscribe(users => {
      console.log('users: ', users);
    })
    return this.af.database.list('users');
  }
}
