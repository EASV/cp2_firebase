import {Profile} from "./profile";
import {Role} from "../roles/role";
export class User{
  $key : string;
  password:string;
  confirmPassword: string;
  profile: Profile;
  role: Role;
}
