import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {User} from "../user";

@Component({
  selector: 'cp-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  @Input()
  user : User;

  @Output()
  deleteUserEvent = new EventEmitter<User>();

  validateDelete: boolean;

  constructor() { }

  ngOnInit() {
  }

  deleteValidation(value : boolean){
    this.validateDelete = value;
  }

  delete(){
    this.validateDelete = false;
    this.deleteUserEvent.emit(this.user);
  }

}
