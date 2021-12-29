import { Component, OnInit, ViewChild} from '@angular/core';
import { Repository } from '../../../data/repository';
import { Router } from '@angular/router';
import { NgForm } from '@angular/forms';
import { ConfirmDialogService } from '../confirm-dialog/confirm-dialog.service';
import { EventEmitterService } from '../../../../services/event-emitter.service';
import { UserSitesComponent } from '../userSites/user.sites.component';
import { SitesRepository } from 'src/app/data/sitesRepository';
import { userSitesDataRequest } from 'src/models/requests/UserSitesDataRequest';
import { UserData } from 'src/models/responses/userDataResponse';
import { SitesService } from 'src/services/SitesService';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import *  as data from '../../../data/language-culture-names-list.json';
import { UserService } from 'src/services/userservice';
import { RolesRepository } from 'src/app/data/roleRepository';
import { userRolesDataRequest } from 'src/models/requests/userRolesDataRequest';
import { RolesServeice } from 'src/services/RolesService';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
declare var hideModal:any;
declare var showModal:any;
@Component({
  selector: "users",
  templateUrl: "./users.component.html",
  styleUrls: ['./users.component.scss'],
  providers: [SitesService,RolesServeice]
})

export class UsersComponent implements OnInit {
  cultures: any = (data as any).default;
  PasswordConfirmation:any;
  @ViewChild(UserSitesComponent ) child: UserSitesComponent ; 
  constructor(private translateService: TranslateService,private confirmDialogService: ConfirmDialogService, private router: Router,
     private repo: Repository, private eventEmitterService: EventEmitterService,
     private _SitesRepository:SitesRepository,
     private userRepo: Repository,private _SitesService:SitesService,
     private notifications: NotificationsService,
     private _UserService:UserService,
     private _RolesRepository: RolesRepository,
     private _RoleService:RolesServeice,
     private toastr: ToastrService
     ) {
    this.repo.getUsers();
    this.repo.editsOn = true;
  }
  ngOnInit(): void {
     
    if (this.eventEmitterService.showConfirmSubsVar == undefined) {
      this.eventEmitterService.showConfirmSubsVar = this.eventEmitterService.
        invokeShowConfirmComponentFunction.subscribe((name: string) => {
          return this.Deactivate();
        });
    }
    
    
  }
  get shwoSaveFlag(): boolean {
    return this.repo.shwoSaveFlag;
  }
  get user(): UserData {
    return this.userRepo.user;
  }
  get entityIsClicked(): boolean {
    return this.repo.entityIsClicked;
  }
  get showForm(): boolean {
    return this.repo.showForm;
  }

  get showSites(): boolean {
    return this.repo.showSites;
  }
  get showRoles(): boolean {
    return this.repo.showRoles;
  } 
  flag:boolean=true;
 ChangeFlagEnable(){
      this.flag=false;
  }

  ChangeFlagDisable(){
      
    this.flag=true;
}
getFormFlag(){
return this.flag;
}
  async Deactivate(): Promise<boolean> {
    if (confirm("Discard Changes?")) {
      // this.repo.editsOn === false;
      return true;
    }
    else {
      return false;
    }
  }
  saveAllForms(){
    this.saveUser();
  }

  saveUser() {
    this.PasswordConfirmation=undefined;
    if(this.repo.user.userName == undefined || this.repo.user.userName == ""){
      this.toastr.error(this.translateService.instant('user.formIsNotValidCheckAllFields'), 'Error');
      return;
    }

    if(this.repo.user.firstName == undefined || this.repo.user.firstName == ""){
      this.toastr.error(this.translateService.instant('user.formIsNotValidCheckAllFields'), 'Error');
      return;
    }

    if(this.repo.user.lastName == undefined || this.repo.user.lastName == ""){
      this.toastr.error(this.translateService.instant('user.formIsNotValidCheckAllFields'), 'Error');
      return;
    }
    if(this.repo.user.areaOfResponsiblity == undefined || this.repo.user.areaOfResponsiblity == ""){
      this.toastr.error(this.translateService.instant('user.formIsNotValidCheckAllFields'), 'Error');
      return;
    }
 
 
    //---------------------update Password-----------------------------
    
    var patt = new RegExp("([A-Za-z]+[0-9]|[0-9]+[A-Za-z])[A-Za-z0-9]*");
    if(this.repo.user.uId != null){
      let CheckUserUpdateRejex = patt.test(this.repo.user.password);
      if(CheckUserUpdateRejex ==false || this.repo.user.password.length < 8) {
        //if rejex not mathc check if user change password 
        //if user not change password update User Without change password
        if("*********************" == this.repo.user.password ){
          this.repo.user.password = null;
         this.Submit();

        }else{
          // if change show alert to user confimation change password
          //check if valid rejex if valid Update it if not alert not valid
          if(CheckUserUpdateRejex == false || this.repo.user.password.length < 8){
            this.toastr.error(this.translateService.instant('user.formIsNotValidCheckAllFields'), 'Error');
          }else{
            //user change it and match rejex
            showModal("confirmPassword");
    
          }
          
        }
      }else{
        //if rejex ok and userid != null 
        //that mean user change passowrd 
        //show alert confirmation too
        showModal("confirmPassword");
     
      }
     
    }else{
      let CheckUserAddRejex = patt.test(this.repo.user.password);
      if(CheckUserAddRejex == false || this.repo.user.password.length < 8){
        this.toastr.error(this.translateService.instant('user.formIsNotValidCheckAllFields'), 'Error');
        return;
      }
      showModal("confirmPassword");
    }
    //-----------------------------------------------------------------
    

   

}
Submit(){
  debugger;
   //this.saveUserSites();
    //this.saveUserRoles();
    if ((this.repo.emailIsExist == false) && (this.repo.usernameIsExist == false)) {
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
             
        // this.repo.getUsers();
        
        if(this.user.isActive == null){
          this.user.isActive = true;
        }
       this._UserService.saveUser(this.user).subscribe(res=>{
         if(res > 0){
           
          this.ChangeFlagDisable();
           this.saveUserSites(res);
           this.saveUserRoles(res);
           this.toastr.success(this.translateService.instant('datasheet.UserIsSavedSuccessfully'), 'Success');
           this.repo.getUsers(res);
         }else{
                       this.toastr.error(this.translateService.instant('user.formIsNotValidCheckAllFields'), 'Error');

           
          }
       
       })
    
    }else{
                this.toastr.error(this.translateService.instant('user.formIsNotValidCheckAllFields'), 'Error');

    
    }
}
  userSitesDataRequest: userSitesDataRequest = {};
  saveUserSites(Ukey) {
     debugger
     console.log("this._SitesRepository.dynamicUserSites",this._SitesRepository.dynamicUserSites)
    const key = 'skey';
    let unique =[];
    if(this._SitesRepository.dynamicUserSites != null){
       unique = [...new Map(this._SitesRepository.dynamicUserSites.map(item =>
        [item[key], item])).values()];
         
    }
    this.userSitesDataRequest = { userId: Ukey, userSites: unique }
    console.log("userSitesDataRequest",this.userSitesDataRequest )
    this._SitesService.saveUserSites(this.userSitesDataRequest).subscribe(
      (res:any)=>{
        if(res.succeeded){
          //this._SitesRepository.getUserSitesByUkey(Ukey);
        //  this.toastr.success('Save User Sites successfully', 'success');
          this._SitesRepository.getUserSites();
        }else{
         // this.toastr.error(res.message, 'Error');
        
        }
      });
  }
  userRolesDataRequest: userRolesDataRequest = {};
  saveUserRoles(uKey:any) {
    
    const key = 'roleKey';
    let unique=[];
    if(this._RolesRepository.dynamicUserRoles != null){
      unique = [...new Map(this._RolesRepository.dynamicUserRoles.map(item =>
        [item[key], item])).values()];
  
    }
    
    this.userRolesDataRequest = { userId: uKey, userRoles: unique }
    this._RoleService.saveUserRoles(this.userRolesDataRequest).subscribe(
      (res:any)=>{
        if(res.succeeded){
        //  this.toastr.success("Save User Roles successfully", 'success');
       }else{
        //  this.toastr.error(res.message, 'Error');
        }
      });
  }
  
  ConfiremPassword(){
  
    if (this.user.password == this.PasswordConfirmation) {
          this.Submit();
          hideModal("confirmPassword");
        }else{
          this.toastr.error(this.translateService.instant('user.ConfirmError'), 'Error');
        }
  }
  messageFromSideBar:any;
  receiveMessage($event) {
      this.messageFromSideBar = $event
    }
  
}
