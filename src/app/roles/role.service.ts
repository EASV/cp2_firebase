import { Injectable } from '@angular/core';
import {AngularFire} from "angularfire2";
import {Observable} from "rxjs";
import {Role} from "./role";

@Injectable()
export class RoleService {

  constructor(private af : AngularFire) {}

  getRoles() : Observable<Role[]> {
    return this.af.database.list('roles');
  }
}
