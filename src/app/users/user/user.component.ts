import {Component, OnInit, Input, Output, EventEmitter,
  trigger,
  state,
  style,
  transition,
  animate, keyframes, group} from '@angular/core';
import {User} from "../user";

@Component({
  selector: 'cp-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  animations: [
    trigger('flyInOut', [
      state('adm', style({transform: 'translateY(0)'})),
      state('edu', style({transform: 'translateY(0)'})),
      state('stud', style({transform: 'translateX(0)'})),
      transition('void => adm', [
        style({transform: 'translateY(100%)'}),
        animate(100)
      ]),
      transition('adm => void', [
        animate(100, style({transform: 'translateX(100%)'}))
      ]),
      transition('void => edu', [
        animate(100, keyframes([
          style({opacity: 1, transform: 'translateY(-100%)'}),
          style({opacity: 1, transform: 'translateY(-100px)'}),
          style({opacity: 0, transform: 'translateY(10px)'})
        ]))
      ]),
      transition('edu => void', [
        animate(100, style({transform: 'translateY(100%)'}))
      ]),
      transition('void => stud', [
        style({transform: 'translateX(-100%)'}),
        animate(100)
      ]),
      transition('stud => void', [
        animate(100, style({transform: 'translateY(-100%)'}))
      ])
    ])
  ]
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
