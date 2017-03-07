import { Injectable } from '@angular/core';
import {AngularFire} from "angularfire2";
import {Observable} from "rxjs";
import {User} from "./user";

@Injectable()
export class UserService {

  constructor(private af : AngularFire) { }

  getUsers() : Observable<User[]>{
    return this.af.database.list('users');
  }

  createUser(user: User){
    this.af.database.list('users').push(user);
  }

  deleteUser($key : string){
    this.af.database.list('users').remove($key);
  }
}
