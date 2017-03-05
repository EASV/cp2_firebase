import { Component, OnInit } from '@angular/core';
import {User} from "../users/user";
import {AngularFire} from "angularfire2";
import {Observable} from "rxjs";
import {UserService} from "../users/user.service";

@Component({
  selector: 'cp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  toolbarTitle = 'CP2';
  users: Observable<User[]>;

  constructor(private userService: UserService) {
  }

  ngOnInit() {
    this.users = this.userService.getUsers();
  }

}
