import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';

@Component({
  selector: 'cp-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  @Output()
  creatingUserEvent = new EventEmitter<boolean>();

  creatingUser : boolean;

  constructor() { }

  ngOnInit() {
  }

  creatingNewUser(value){
    this.creatingUser = value;
    this.creatingUserEvent.emit(value);
  }

  onSubmit(){

  }
}
