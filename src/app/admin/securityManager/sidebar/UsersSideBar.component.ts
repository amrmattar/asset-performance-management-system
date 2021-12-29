import { Component, EventEmitter, Output } from '@angular/core';
import { Repository } from '../../../data/repository';
import { UserData } from '../../../../models/responses/userDataResponse';
import { SitesRepository } from '../../../data/sitesRepository';
import { SitesComponent } from '../sites/sites';
import { EventEmitterService } from '../../../../services/event-emitter.service';
import { UsersComponent } from '../Users/users.component';
import { RolesRepository } from '../../../data/roleRepository';
import { UsersFormComponent } from '../user-form/user.form.component';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

@Component({
  selector: "users-sidebar",
  templateUrl: "./UsersSideBar.component.html",
  styleUrls: ['./UsersSideBar.component.scss'],
  providers:[UsersFormComponent]
})

export class UsersSideBarComponent {
  public config: PerfectScrollbarConfigInterface = {};
  public search: string;
  constructor(private repo: Repository, 
    private siteRepo: SitesRepository,
    private roleRepo:RolesRepository,
    private eventEmitterService: EventEmitterService,
    private _UsersComponent:UsersComponent,
    private _UsersFormComponent:UsersFormComponent) {
    
  }
  @Output() messageEvent = new EventEmitter<any>();
  get users(): UserData[] {
    return this.repo.users;
  }
  public setSearch() {
      
    this.repo.filter.search = this.search;
    this.repo.getUsersSearch();

  }
   showModal(): any{
    return (async () => await  this.eventEmitterService.showConfirm())();

  }
get entityIsClicked(): boolean {
    return this.repo.entityIsClicked;
  }
  userSelectedId:any;
    setUser(userData: UserData) {
      this.roleRepo.dynamicUserRoles=null;
      this.siteRepo.dynamicUserSites=null;
      this.repo.InvalidPasswordFlag=false;
      this.repo.OldPasswordSaving=userData.password;
    let flagChange=this._UsersComponent.getFormFlag();
    if(flagChange == false){
       
       if (confirm("Discard Changes?")) {
          this.repo.getUsers().then(x=>{
            this.repo.getStatesOfCountry(userData.country);
            this.repo.getcitesBystateId(userData.state);
          this._UsersComponent.ChangeFlagDisable();
          //if (this.showModal() == true) {
            this.repo.shwoSaveFlag=true;
          this.repo.entityIsClicked = true;
           this.repo.showForm = true;
           this.repo.showSites = false;
           this.repo.showRoles = false;
           this.siteRepo.dynamicUserSites = null;
           this.roleRepo.dynamicUserRoles = null;
           this.userSelectedId=userData.uId;
           userData.password ="*********************";
           this._UsersFormComponent.resetPattern();
           this.repo.setuser(userData);

          this.siteRepo.getUserSites();
          this.roleRepo.getUserRoles()
        });
        }
      
     
    }else{
       
      this._UsersComponent.ChangeFlagDisable();
      //if (this.showModal() == true) {
        this.repo.shwoSaveFlag=true;
      this.repo.entityIsClicked = true;
       this.repo.showForm = true;
       this.repo.showSites = false;
       this.repo.showRoles = false;
       this.siteRepo.dynamicUserSites = null;
       this.roleRepo.dynamicUserRoles = null;
       this.repo.getStatesOfCountry(userData.country);
       this.repo.getcitesBystateId(userData.state);
       this.repo.setuser({});
       this.userSelectedId=userData.uId;
       userData.password ="*********************";
       this._UsersFormComponent.resetPattern();
       this.repo.setuser(userData);
      //  this.siteRepo.getUserSites();
      // this.roleRepo.getUserRoles()
    }
    this.sendMessage(userData.uKey)
    

 

  }
  UserData:any;
  sendMessage(uKey:any) {
    this.UserData={
      uKey:uKey
    };
      this.messageEvent.emit( this.UserData)
    }
  get userData(): UserData {
    return this.repo.user;
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
  public resetForm() {
    //  
    let flagChange=this._UsersComponent.getFormFlag();
    if(flagChange == false){
      if (confirm("Discard Changes?")) {
        this._UsersComponent.ChangeFlagDisable();
        this.repo.shwoSaveFlag=true;
         this.repo.entityIsClicked = true;
        this.repo.getUsers().then(
          x=>{
            this.siteRepo.dynamicUserSites=null;
            this.roleRepo.dynamicUserRoles = null;
            this.repo.showForm = true;
            this.repo.showRoles = false;
            this.repo.showSites = false;
            var hrForm = <HTMLFormElement>document.getElementById('userForm');
            this.repo.setuser({isActive:true});
          }
        );
     
      }
      
    }else{
      this._UsersComponent.ChangeFlagDisable();
      this.repo.shwoSaveFlag=true;
       this.repo.entityIsClicked = true;
      this.siteRepo.dynamicUserSites=null;
      this.roleRepo.dynamicUserRoles = null;
      this.repo.showForm = true;
      this.repo.showRoles = false;
      this.repo.showSites = false;
      var hrForm = <HTMLFormElement>document.getElementById('userForm');
      this.repo.setuser({isActive:true});
    }
  
    
  }
  addNewSite() {
    this.eventEmitterService.createSiteComponent();    

  }
  addNewRole()
  {
    this.eventEmitterService.createRoleComponent();    
  }
  hideAll() {
    this.repo.shwoSaveFlag=false;
    this.repo.entityIsClicked = false;
    this.repo.showForm = false;
    this.repo.showRoles = false;
    this.repo.showSites = false;
    this.userSelectedId=null;
  }

}
