import { Injectable } from '@angular/core';
import {AngularFire} from "angularfire2";
import {Observable, ReplaySubject} from "rxjs";
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

  createUser(user: User) : ReplaySubject<any> {
    let resultSubject = new ReplaySubject(1);

    if(!this.app){
      this.app = firebase.initializeApp(firebaseConfig,"secondary");
    }
    this.app.auth().createUserWithEmailAndPassword(user.email, user.password)
      .then(fbAuth => {
        this.af.database.list('users').push({
          email: user.email,
          username: user.username,
          uid: fbAuth.uid
        })
          .then(user => {
            resultSubject.next(user);
          })
          .catch(err => {
            resultSubject.error(err);
          })
      })
      .catch(err => {
        resultSubject.error(err);
      });
    return resultSubject;
  }

  deleteUser($key : string){
    this.af.database.list('users').remove($key);
  }
}
