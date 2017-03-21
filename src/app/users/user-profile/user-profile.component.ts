import {Component, OnInit, ViewChild} from '@angular/core';
import {UserService} from "../user.service";
import {User} from "../user";
import {Profile} from "../profile";
import {AuthService} from "../../auth/auth.service";
import {MdSnackBar} from "@angular/material";

@Component({
  selector: 'cp-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.css']
})
export class UserProfileComponent implements OnInit {

  initialProfile: Profile;
  user: User;

  error: string;

  constructor(private userService: UserService,
    private auth: AuthService,
    public updateValidationBar: MdSnackBar) { }

  ngOnInit() {
    let sub = this.auth.currentUser().subscribe(user => {
      this.user = user;
      this.cloneInitial(this.user.profile);
      sub.unsubscribe();
    });
    this.user = new User();
    this.user.profile = new Profile();
    this.cloneInitial(this.user.profile);
  }

  cloneInitial(profile : Profile){
    this.initialProfile = Object.assign(new Profile(), profile);
  }

  onSubmit(userProfileForm){
    if(userProfileForm.form.valid){
      let sub = this.userService.updateUserProfile(this.user)
        .subscribe(user => {
          this.updateValidationBar.open("Your profile is update", "Ok", {
            duration: 3000
          });
          this.cloneInitial(user.profile);
        },
        err => {
          this.error = err.message;
        },
        () => {
          sub.unsubscribe();
        });
    }
  }

  profileIsChanged(){
    return this.user.profile.displayName !== this.initialProfile.displayName
      || this.user.profile.username !== this.initialProfile.username
      || this.user.profile.email !== this.initialProfile.email;
  }
}
