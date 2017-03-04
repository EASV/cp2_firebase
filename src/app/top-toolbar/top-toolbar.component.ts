import {Component, OnInit, Input} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {auditTime} from "rxjs/operator/auditTime";
import {User} from "../users/user";
import {MdSnackBar} from "@angular/material";
import {Router} from "@angular/router";
import {FirebaseAuthState} from "angularfire2";

@Component({
  selector: 'cp-top-toolbar',
  templateUrl: './top-toolbar.component.html',
  styleUrls: ['./top-toolbar.component.css']
})
export class TopToolbarComponent implements OnInit {
  @Input()
  title : string;

  user: FirebaseAuthState;

  constructor(private auth: AuthService,
              public loginValidationBar: MdSnackBar,
              private router: Router) {

  }

  logout(){
    this.router.navigate(['/login']).then(() => {
      this.loginValidationBar.open("You are logged out", "Ok", {
        duration: 3000,
      });
    });

  }

  ngOnInit() {
    this.auth.currentUser().subscribe(user => {
      this.user = user;
    })
  }

}
