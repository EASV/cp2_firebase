import {Component, OnInit, Input} from '@angular/core';
import {Observable} from "rxjs";
import {User} from "../user";
import {UserService} from "../user.service";

@Component({
  selector: 'cp-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  @Input()
  users : Observable<User[]>

  constructor(private userService : UserService) { }

  ngOnInit() {
  }

  deleteUser($key){
    this.userService.deleteUser($key);
  }

  createUserClicked(){

  }

}
