import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanLoad, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard  implements CanLoad {

  constructor(
    private authService: AuthService,
    private router:Router,

    ) {

  }
  canLoad(
   ) {
      if (this.authService.isLoggedIn()) {
        return true;
      }
      this.router.navigate(['auth']);
      // this.router.navigate(['dashboard']);
  }
}
