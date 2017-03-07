import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {User} from "../user";

@Component({
  selector: 'cp-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  @Output()
  creatingUserEvent = new EventEmitter<boolean>();

  @Output()
  createUserEvent = new EventEmitter<User>();

  creatingUser : boolean;
  user : User;

  constructor() {
    this.clear();
  }

  ngOnInit() {
  }

  creatingNewUser(value){
    this.creatingUser = value;
    this.creatingUserEvent.emit(value);
  }

  onSubmit(){
    this.createUserEvent.emit(this.user);
    this.creatingUser = false;
    this.clear();
  }

  clear(){
    this.user = new User();
  }


}
