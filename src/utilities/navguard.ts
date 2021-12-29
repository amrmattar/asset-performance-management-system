import { ActivatedRouteSnapshot, RouterStateSnapshot, CanActivate, CanDeactivate } from '@angular/router';
import { UsersComponent } from '../app/admin/securityManager/Users/users.component';
import { Observable } from 'rxjs';
import { Repository } from '../app/data/repository';

import { ConfirmDialogService } from '../app/admin/securityManager/confirm-dialog/confirm-dialog.service';
import { Injectable } from '@angular/core';
import { ConfirmDialogComponent } from '../app/admin/securityManager/confirm-dialog/confirm-dialog.component';
import { TablesRepository } from '../app/data/tables.repository';

@Injectable({
  providedIn: 'root'
})
export class DeactivateGuard implements CanDeactivate<any> {
  constructor( private confirmDialogService: ConfirmDialogService, private tableRepo:TablesRepository) {

  }
  canDeactivate(component: any) {
   
    return (() => this.Deactivate())();
  }

  async Deactivate(): Promise<boolean> {
    if (confirm("Discard Changes?")) {
      // this.repo.editsOn === false;
      this.tableRepo.showSidebar = false;
      this.tableRepo.showForm = false;
      this.tableRepo.showNav = false;
      return true;
    }
    else {
      return false;
    }
  }
}
@Injectable({
  providedIn: 'root'
})
export class NavGuard implements CanActivate {
    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | import("@angular/router").UrlTree | Observable<boolean | import("@angular/router").UrlTree> | Promise<boolean | import("@angular/router").UrlTree> {
        throw new Error("Method not implemented.");
    }
  constructor(private repo: Repository, private confirmDialogService: ConfirmDialogService) {

  }

   async canDeactivate():  Promise<Observable<boolean> | boolean> {
    // you can just return true or false synchronously
    if (this.repo.editsOn === false) {

      return true;
    } else {
      var result = await this.showDialog();
      return result;
    }
  }
  
    showDialog(): boolean {
      return this.confirmDialogService.confirmThis("Discard Changes?", function () {
      return true;
    }, function () {
      //alert("No clicked");
      return false;

    });
  }  
}
