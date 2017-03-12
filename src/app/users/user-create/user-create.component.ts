import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {User} from "../user";
import {RoleService} from "../../roles/role.service";
import {ObservableMedia} from "@angular/flex-layout";
import {Role} from "../../roles/role";
import {Observable} from "rxjs";

@Component({
  selector: 'cp-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {

  @Input()
  creatingUser : boolean;
  @Input()
  user : User;
  @Input()
  error : string;

  @Output()
  creatingUserEvent = new EventEmitter<boolean>();

  @Output()
  createUserEvent = new EventEmitter<User>();

  roles: Observable<Role[]>

  constructor(private rs: RoleService) {
  }

  ngOnInit() {
    this.roles = this.rs.getRoles();
  }

  creatingNewUser(value){
    this.creatingUser = value;
    this.creatingUserEvent.emit(value);
  }

  onSubmit(userForm){
    if(userForm.form.valid){
      this.createUserEvent.emit(this.user);
    }
  }

}
