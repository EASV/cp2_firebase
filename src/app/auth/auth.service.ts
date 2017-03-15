import { Injectable } from '@angular/core';
import {AngularFire, FirebaseAuthState} from "angularfire2";
import {Observable, ReplaySubject} from "rxjs";
import {User} from "../users/user";
import {UserService} from "../users/user.service";

@Injectable()
export class AuthService {
  constructor(private af : AngularFire,
              private userService: UserService) {}

  login(email, password) : Observable<FirebaseAuthState>{
    let promise = <Promise<FirebaseAuthState>> this.af.auth.login({
      email: email,
      password: password,
    });
    return Observable.fromPromise(promise);
  }

  currentUser() : Observable<User>{
    return this.af.auth
      .switchMap((authState: FirebaseAuthState) => authState ?
        this.userService.getUser(authState.uid) :
        Observable.of(null));
  }

  isAuthenticated(roles: string[]) : Observable<boolean>{
    return this.currentUser()
      .switchMap(user =>
        roles ?
        Observable.of(!!user && roles.indexOf(user.role.name) > -1) :
        Observable.of(!!user)

    );
  }

  logout() : Observable<void>{
    let promise = this.af.auth.logout();
    return Observable.fromPromise(promise);
  }

}
