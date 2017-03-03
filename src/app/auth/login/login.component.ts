import {Component, OnInit, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {MdSnackBar} from '@angular/material';
import {AuthService} from "../auth.service";
import {Subscription, Observable} from "rxjs";

@Component({
  selector: 'cp-login',
  templateUrl: 'login.component.html'
})
export class LoginComponent implements OnInit, OnDestroy {

  loginError: string;
  request: Subscription;
  tryingToLogIn: boolean;

  constructor(public loginValidationBar: MdSnackBar,
              private router: Router,
              private auth: AuthService) {
    this.auth.logout();
  }

  login(user) {
    this.tryingToLogIn = true;
    if (this.request) {
      this.request.unsubscribe();
    }
    this.request = this.auth
      .login(user.username, user.password)
      .delay(1000)
      .subscribe(
        //Is the data
        (lUser) => {
          if (lUser) {
            this.loginError = null;
            this.router.navigate(['/']).then(() => {
              this.loginValidationBar.open("You are logged in", "Ok", {
                duration: 3000,
              });
            });
          } else {
            this.loginError = "username and password was wrong";
          }
        },
        //Error handling
        (err) => {
          console.error(err);
          this.loginError = "An error occoured during login, see error in console";
          this.tryingToLogIn = false;
        },
        //Observable Done
        () => {
          console.log("Done!");
          this.tryingToLogIn = false;
        }
      );


  }

  ngOnInit() {
  }

  ngOnDestroy(){
    if (this.request) {
      this.request.unsubscribe();
    }
  }

}
