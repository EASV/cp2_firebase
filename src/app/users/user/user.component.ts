import {Component, OnInit, Input} from '@angular/core';
import {User} from "../user";

@Component({
  selector: 'cp-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @Input()
  user : User;

  constructor() { }

  ngOnInit() {
  }

}
