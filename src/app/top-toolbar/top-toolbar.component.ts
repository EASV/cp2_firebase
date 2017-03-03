import {Component, OnInit, Input} from '@angular/core';
import {AuthService} from "../auth/auth.service";
import {auditTime} from "rxjs/operator/auditTime";
import {User} from "../users/user";
import {MdSnackBar} from "@angular/material";
import {Router} from "@angular/router";

@Component({
  selector: 'cp-top-toolbar',
  templateUrl: './top-toolbar.component.html',
  styleUrls: ['./top-toolbar.component.css']
})
export class TopToolbarComponent implements OnInit {
  @Input()
  title : string;

  user: User;

  constructor(private auth: AuthService,
              public loginValidationBar: MdSnackBar,
              private router: Router) {
    this.user = auth.currentUser();
  }

  logout(){
    this.router.navigate(['/login']).then(() => {
      this.loginValidationBar.open("You are logged out", "Ok", {
        duration: 3000,
      });
    });

  }

  ngOnInit() {
  }

}
