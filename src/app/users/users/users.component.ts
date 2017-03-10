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
  user : User;

  constructor(private userService : UserService) { }

  ngOnInit() {
    this.user = new User();
    this.users = this.userService.getUsers();

  }

  creatingUserEvent(value){
    this.creatingUser = value;
  }

  createUser(user){
    this.userService.createUser(user)
      .subscribe(user => {
        this.creatingUser = false;
      },
      err => {
        console.log(err);
      });

  }

}
