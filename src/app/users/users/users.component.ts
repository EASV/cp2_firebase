import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {User} from "../user";
import {UserService} from "../user.service";
import {log} from "util";

@Component({
  selector: 'cp-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users : Observable<User[]>

  creatingUser : boolean;

  constructor(private userService : UserService) { }

  ngOnInit() {
    this.users = this.userService.getUsers();
  }

  creatingUserEvent(value){
    this.creatingUser = value;
  }

  createUser(user){
    console.log('user', user);
  }

}
