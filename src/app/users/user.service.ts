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

    //auth User and profile
    this.af.auth.createUser({email: user.email, password: user.password})
      .then(res => {
        this.af.database.list('users').push({
          email: user.email,
          username: user.username,
          uid: res.uid
        });
      })
      .catch(err => {
        console.error('err', err);
      })
  }

  deleteUser($key : string){
    this.af.database.list('users').remove($key);
  }
}
