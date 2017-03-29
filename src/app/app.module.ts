import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpModule} from '@angular/http';
import { Angular2FontawesomeModule } from 'angular2-fontawesome/angular2-fontawesome'
import { MaterialModule } from '@angular/material';
import { RouterModule, Routes } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import 'hammerjs';
import {AngularFireModule, AuthProviders, AuthMethods} from 'angularfire2';
import { Ng2PageTransitionModule } from "ng2-page-transition"; // <-- import the module

import { AppComponent } from './app.component';
import { TopToolbarComponent } from './top-toolbar/top-toolbar.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './auth/login/login.component';
import { LoginViewComponent } from './auth/login/login-view.component';
import {AuthService} from "./auth/auth.service";
import {UserService} from "./users/user.service";
import {AuthGuard} from "./auth/auth-guard";
import { UsersComponent } from './users/users/users.component';
import { UserListComponent } from './users/user-list/user-list.component';
import { UserComponent } from './users/user/user.component';
import { UserCreateComponent } from './users/user-create/user-create.component';
import {EqualTextValidator} from "./users/equal.validator";
import {firebaseConfig, firebarebaseLoginConfig} from "./app.settings";
import {RoleService} from "./roles/role.service";
import { UserProfileComponent } from './users/user-profile/user-profile.component';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  { path: 'profile',
    component: UserProfileComponent,
    canActivate: [AuthGuard]
  },
  { path: 'users',
    component: UsersComponent,
    canActivate: [AuthGuard],
    data: {roles: ['educator', 'admin']}
  },
  { path: 'login', component: LoginComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    TopToolbarComponent,
    HomeComponent,
    LoginComponent,
    LoginViewComponent,
    UsersComponent,
    UserListComponent,
    UserComponent,
    UserCreateComponent,
    EqualTextValidator,
    UserProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    Angular2FontawesomeModule,
    MaterialModule,
    FlexLayoutModule,
    RouterModule.forRoot(appRoutes),
    AngularFireModule.initializeApp(firebaseConfig, firebarebaseLoginConfig),
    Ng2PageTransitionModule,
    BrowserAnimationsModule
  ],
  providers: [
    AuthService,
    UserService,
    AuthGuard,
    RoleService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
