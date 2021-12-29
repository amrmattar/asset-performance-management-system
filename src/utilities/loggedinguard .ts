import { Injectable } from '@angular/core';
import { CanActivate, RouterStateSnapshot, ActivatedRouteSnapshot, Router } from '@angular/router';
import UserUtility from '../utilities/userutility';
@Injectable({
  providedIn: 'root'
})
export class LoggedInGuard implements CanActivate {

  constructor(protected router: Router) {
  }
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (UserUtility.GetLogedInUser() == null) {
      this.router.navigate(['/login']);
      return false;
    }
    return true;
  }
}
