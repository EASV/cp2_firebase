import { Component, OnInit } from '@angular/core';
import {UserService} from "../user.service";
import {User} from "../user";
import {Profile} from "../profile";

@Component({
  selector: 'cp-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  user: User;

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.user = new User();
    this.user.profile = new Profile();
  }

}
