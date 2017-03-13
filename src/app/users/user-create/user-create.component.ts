import {Component, OnInit, Input, Output, EventEmitter, OnDestroy} from '@angular/core';
import {User} from "../user";
import {RoleService} from "../../roles/role.service";
import {ObservableMedia} from "@angular/flex-layout";
import {Role} from "../../roles/role";
import {Observable, Subscription} from "rxjs";

@Component({
  selector: 'cp-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit, OnDestroy {

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

  roles: Role[];
  sub : Subscription;

  constructor(private rs: RoleService) {
  }

  ngOnInit() {
    this.sub = this.rs.getRoles().subscribe(roles => {
      this.roles = roles;
      if(this.roles.length > 0){
        this.user.role = roles[0];
      }
    });
  }

  ngOnDestroy(){
    this.sub.unsubscribe();
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
