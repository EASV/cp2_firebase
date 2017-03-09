import { Injectable } from '@angular/core';
import {AngularFire} from "angularfire2";
import {Observable} from "rxjs";
import {User} from "./user";
import {firebaseConfig} from "../app.settings";
let firebase = require("firebase");

@Injectable()
export class UserService {

  app;
  constructor(private af : AngularFire) { }

  getUsers() : Observable<User[]>{
    return this.af.database.list('users');
  }

  createUser(user: User){
    if(!this.app){
      this.app = firebase.initializeApp(firebaseConfig,"secondary");
    }
    //auth User and profile
    this.app.auth().createUserWithEmailAndPassword(user.email, user.password)
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
