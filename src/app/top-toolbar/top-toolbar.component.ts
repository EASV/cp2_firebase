import {Component, OnInit, Input, OnDestroy} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {auditTime} from "rxjs/operator/auditTime";
import {User} from "../users/user";
import {MdSnackBar} from "@angular/material";
import {Router} from "@angular/router";
import {FirebaseAuthState} from "angularfire2";
import {Subscription} from "rxjs";

@Component({
  selector: 'cp-top-toolbar',
  templateUrl: './top-toolbar.component.html',
  styleUrls: ['./top-toolbar.component.css']
})
export class TopToolbarComponent implements OnInit, OnDestroy {
  @Input()
  title : string;

  user: User;

  logoutSub: Subscription;
  currentUserSub: Subscription;

  constructor(private auth: AuthService,
              public loginValidationBar: MdSnackBar,
              private router: Router) {}

  logout(){
    this.logoutSub = this.auth.logout().subscribe(() => {
      this.router.navigate(['/login']).then(() => {
        this.loginValidationBar.open("You are logged out", "Ok", {
          duration: 3000,
        });
      });
    });
  }

  ngOnInit() {
    this.currentUserSub = this.auth.currentUser().subscribe(user => {
      this.user = user;
    })
  }

  ngOnDestroy(){
    if(this.logoutSub){
      this.logoutSub.unsubscribe();
    }
    if(this.currentUserSub){
      this.currentUserSub.unsubscribe();
    }
  }

}
