import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs";
import {User} from "../user";
import {UserService} from "../user.service";
import {log} from "util";
import {Profile} from "../profile";
import {Role} from "../../roles/role";

@Component({
  selector: 'cp-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users : Observable<User[]>

  creatingUser : boolean;
  user : User;
  error: string;

  constructor(private userService : UserService) { }

  ngOnInit() {
    this.user = new User();
    this.user.profile = new Profile();
    this.user.role = new Role();
    this.users = this.userService.getUsers();

  }

  creatingUserEvent(value){
    if(!value){
      this.user = new User();
    }
    this.creatingUser = value;
  }

  createUser(user){
    this.userService.createUser(user)
      .subscribe(user => {
        this.creatingUser = false;
        this.error = null;
        this.user = new User();
      },
      err => {
        this.error = err.message;
      });

  }

}
