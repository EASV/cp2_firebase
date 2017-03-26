import {
  Component, OnInit, Input,
  trigger,
  state,
  style,
  transition,
  animate, keyframes
} from '@angular/core';
import {Observable} from "rxjs";
import {User} from "../user";
import {UserService} from "../user.service";

@Component({
  selector: 'cp-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css'],
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
        animate(800, keyframes([
          style({opacity: 1, transform: 'translateY(-100%)'}),
          style({opacity: 1, transform: 'translateY(-100px)'}),
          style({opacity: 0, transform: 'translateY(10px)'})
        ]))
      ]),
      transition('edu => void', [
        animate(800, style({transform: 'translateY(100%)'}))
      ]),
      transition('void => stud', [
        style({transform: 'translateX(-100%)'}),
        animate(1100)
      ]),
      transition('stud => void', [
        animate(1100, style({transform: 'translateY(-100%)'}))
      ])
    ])
  ]
})
export class UserListComponent implements OnInit {

  @Input()
  users : Observable<User[]>

  constructor(private userService : UserService) { }

  ngOnInit() {
  }

  deleteUser(user : User){
    this.userService.deleteUser(user).subscribe(user => {
      console.log('deleting ', user);
    },
     err => {
      console.log('err', err);
     });
  }

  createUserClicked(){

  }

}
