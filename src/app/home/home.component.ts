import { Component, OnInit } from '@angular/core';
import {User} from "../users/user";

@Component({
  selector: 'cp-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  toolbarTitle = 'CP2';
  users: User[];

  constructor() {
  }

  ngOnInit() {
  }

}
