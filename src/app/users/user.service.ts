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
    this.app.auth().createUserWithEmailAndPassword(user.profile.email, user.password)
      .then(fbAuth => {
        this.af.database.object(`users/${fbAuth.uid}`).set({
          email: user.profile.email,
          username: user.profile.username
        })
          .then(() => {
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
    if($key !== undefined){
      this.af.database.list('users').remove($key);
    }
  }
}
