import { Injectable } from '@angular/core';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, public router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if(!this.authService.isLogued()){
      this.router.navigate(["/auth/login"]);
      return false;
    }

    if(!this.authService.getUserByToken()){
      this.authService.logout();
      return false;
    }else{
      return true;
    }
  }
}
