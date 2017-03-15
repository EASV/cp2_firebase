import {Injectable} from "@angular/core";
import {CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot} from "@angular/router";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private auth: AuthService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot): Observable<boolean> {
    let roles = route.data["roles"] as Array<string>;
    //['educator', 'admin']
    return this.auth.isAuthenticated(roles)
      .do(authenticated =>{
        if (!authenticated) this.router.navigate(['/login']);
      });
  }
}

