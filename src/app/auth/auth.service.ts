import { Injectable } from '@angular/core';
import {AngularFire, FirebaseAuthState} from "angularfire2";
import {Observable} from "rxjs";

@Injectable()
export class AuthService {
  constructor(private af : AngularFire) {}

  login(email, password) : Observable<FirebaseAuthState>{
    let promise = <Promise<FirebaseAuthState>> this.af.auth.login({
      email: email,
      password: password,
    });
    return Observable.fromPromise(promise);
  }

  currentUser() : Observable<FirebaseAuthState>{
    return this.af.auth;
  }

  logout() : Observable<void>{
    let promise = this.af.auth.logout();
    return Observable.fromPromise(promise);
  }

}
