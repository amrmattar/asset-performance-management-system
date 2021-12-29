import { Component, TemplateRef, ViewChild } from '@angular/core';
import { Repository } from '../../../data/repository';
import { UserData } from '../../../../models/responses/userDataResponse';
import { userSitesDataRequest } from '../../../../models/requests/UserSitesDataRequest';
import { SitesRepository } from '../../../data/sitesRepository';
import { RolesRepository } from '../../../data/roleRepository';
import { userRolesDataRequest } from '../../../../models/requests/userRolesDataRequest';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import *  as data from '../../../data/language-culture-names-list.json';
 import { UserService } from 'src/services/userservice';
@Component({
  selector: "users-navbar",
  templateUrl: "./users.navbar.html",
  providers:[UserService]
})
export class UsersNavbarComponent {
  cultures: any = (data as any).default;
  constructor(private rolesRepo: RolesRepository, private siteRepo: SitesRepository,
    private repo: Repository, private notifications: NotificationsService, 
    private modalService: BsModalService,
    private _UserService:UserService,
    ) {
  }
  userSitesDataRequest: userSitesDataRequest = {};
  userRolesDataRequest: userRolesDataRequest = {};
  modalRef: BsModalRef;

  get user(): UserData {
    return this.repo.user;
  }
     saveUser() {
        
     // this.user.imagePath = this.response.dbPath;
       var userForm = <HTMLFormElement>document.getElementById('userForm');

       if (userForm != null && userForm.checkValidity() && (this.repo.emailIsExist == false) && (this.repo.usernameIsExist == false)) {
         //userForm.submit();
        
           if( this.user.uom  == null)
           {    
                 this.user.uom = this.repo.uomcs[0].uomkey
           }
           if( this.user.isLdap  == null)
           {    
                 this.user.isLdap = false;
           }
           if( this.user.isSuper  == null)
           {    
                 this.user.isSuper = false;
           }
           if( this.user.isLocked  == null)
           {    
                 this.user.isLocked = false;
           }
           if( this.user.mustChangePassword  == null)
           {    
                 this.user.mustChangePassword = false;
           }
           if( this.user.culture  == null)
           {    
                 this.user.culture = this.cultures[0].cultureInfoCode;
           }
                
          this._UserService.saveUser(this.user).subscribe(res=>{
            if(res > 0){
              userForm.reset();
              this.notifications.create('Success', 'User is saved Successfully!', NotificationType.Success, { theClass: 'outline primary', timeOut: 6000, showProgressBar: false });
              this.repo.getUsers();
            }else{
              this.notifications.create('Error', 'form is not valid, check all fields!!', NotificationType.Bare, { theClass: 'outline primary', timeOut: 6000, showProgressBar: false });
            }
          
          })

       }else{
        this.notifications.create('Error', 'form is not valid, check all fields!!', NotificationType.Bare, { theClass: 'outline primary', timeOut: 6000, showProgressBar: false });

       }

  }


  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
    // this.repo.deleteUser(this.user.uId);
  }
  confirm(): void {
    //this.message = 'Confirmed!';
    this.repo.deleteUser(this.user.uId);
    this.modalRef.hide();
  }

  decline(): void {
    //this.message = 'Declined!';
    this.modalRef.hide();
  }
  /*saveUserSites() {
    const key = 'skey';
    const unique = [...new Map(this.siteRepo.dynamicUserSites.map(item =>
      [item[key], item])).values()];

    this.userSitesDataRequest = { userId: this.user.uKey, userSites: unique }
    this.siteRepo.saveUserSites(this.userSitesDataRequest);

  }
  saveUserRoles() {
    const key = 'roleKey';
    const unique = [...new Map(this.rolesRepo.dynamicUserRoles.map(item =>
      [item[key], item])).values()];

    this.userRolesDataRequest = { userId: this.user.uKey, userRoles: unique }
    this.rolesRepo.saveUserRoles(this.userRolesDataRequest);

  }*/
  
  public resetForm() {
     
    this.siteRepo.dynamicUserSites=null;
    this.repo.setuser({});
    var hrForm = <HTMLFormElement>document.getElementById('userForm');
    hrForm.reset();
    
  }
}
