import { Injectable } from "@angular/core";
import {
  CanActivate,
  CanActivateChild,
  Router,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from "@angular/router";


@Injectable()
export class AuthGuard implements CanActivate, CanActivateChild {
  constructor(private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (localStorage.getItem("userToken") != null) {
   
      // var payLoad = JSON.parse(
      //   window.atob(localStorage.getItem("userToken").split(".")[1])
      // );

      // var userRole = payLoad.role;
      // var Ukey=payLoad.Ukey;
      // localStorage.setItem("Ukey", Ukey)
      // localStorage.setItem("CurrentRole", userRole);
      // console.log("CurrentRole",userRole);
      // let roles = next.data["roles"] as Array<string>;
      // if (roles) {
      //   if (this.roleMatch(roles)) return true;
      //   else {
      //     this.router.navigateByUrl("/authentication/404");
      //     return false;
      //   }
      // }
      return true;
    } else {
      this.router.navigateByUrl("/login");
      return false;
    }
  }
  canActivateChild(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {

    if (localStorage.getItem("userToken") != null) {
   
      // var payLoad = JSON.parse(
      //   window.atob(localStorage.getItem("userToken").split(".")[1])
      // );
      // var userRole = payLoad.role;
      // localStorage.setItem("CurrentRole", userRole);
      // let roles = next.data["roles"] as Array<string>;
      // if (roles) {
      //   if (this.roleMatch(roles)) return true;
      //   else {
      //     this.router.navigateByUrl("/authentication/404");
      //     return false;
      //   }
      // }
       return true;
    } else {
      this.router.navigateByUrl("/login");
      return false;
    }
  }

  roleMatch(allowedRoles): boolean {
    var isMatch = false;
    var payLoad = JSON.parse(
      window.atob(localStorage.getItem("userToken").split(".")[1])
    );
    //change to Array Of Roles
    var userRole = payLoad.role;
    allowedRoles.forEach((element) => {
      ;
      if(Array.isArray(userRole)){
        if (userRole.find(x=>x==element) != null ) {
          isMatch = true;
          return false;
        }
      }else{
        if (userRole == element ) {
          isMatch = true;
          return false;
        }
      }
    });
    return isMatch;
  }
}
