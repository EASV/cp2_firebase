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

  isAuthenticated() : Observable<boolean>{
    return this.af.auth
      .take(1)
      .map((authState: FirebaseAuthState) => !!authState);
    //!authstate = true is state not there
    //!!authstate = true if state is there
  }

  logout() : Observable<void>{
    let promise = this.af.auth.logout();
    return Observable.fromPromise(promise);
  }

}
