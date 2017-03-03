import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {AuthUser} from "../auth-user";

@Component({
  selector: 'cp-login-view',
  templateUrl: 'login-view.component.html',
  styleUrls: ['login-view.component.css']
})
export class LoginViewComponent implements OnInit {
  user : AuthUser;

  @Input()
  signInError : string;

  @Input()
  tryingToLogIn: boolean;

  @Output('login')
  tryLoginEmitter = new EventEmitter<AuthUser>();

  tryLogin(){
    this.tryLoginEmitter.emit(this.user);
  }

  constructor() {
    this.user = new AuthUser();
  }

  ngOnInit() {
  }

}
