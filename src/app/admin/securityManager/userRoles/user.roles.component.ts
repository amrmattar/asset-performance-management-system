import { Component, ViewChild, ComponentRef, ViewContainerRef, ComponentFactoryResolver, ComponentFactory, Input, OnInit } from '@angular/core';
import { UserData } from '../../../../models/responses/userDataResponse';
import { Repository } from '../../../data/repository';
import { RolesRepository } from '../../../data/roleRepository';
import { userRolesDataRequest } from '../../../../models/requests/userRolesDataRequest';
import { RolesData } from '../../../../models/responses/rolesDataResponse';
import { AddRoleComponent } from '../addRole/add.role';
import { EventEmitterService } from '../../../../services/event-emitter.service';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { RolesServeice } from 'src/services/RolesService';
import { UsersComponent } from '../Users/users.component';





@Component({
  selector: "user-roles",
  templateUrl: "./user.roles.component.html",
  styleUrls: ['./user.roles.component.scss'],
  providers: [RolesServeice]
})
export class UserRolesComponent implements OnInit {
  @Input() childMessage: any;
  counter=1;
  selectedObject: RolesData = {};
  RoleOfUser:any[];
  //userRoles: RolesData[];
  userRolesDataRequest: userRolesDataRequest = {};
  child_unique_key: number = 0;
  componentsReferences: Array<ComponentRef<AddRoleComponent>> = [];
  firsttime: boolean = false;
  ListOfRoles:any[];
  listOfRoleKey:any[];
  @ViewChild("viewContainerRef", { read: ViewContainerRef })
  VCR: ViewContainerRef;
  listDeleteRoles:any=[];
  constructor(private repo: RolesRepository, private userRepo: Repository,
    private CFR: ComponentFactoryResolver, private eventEmitterService: EventEmitterService,
    private notifications: NotificationsService,
    private _RoleService:RolesServeice,private _UsersComponent:UsersComponent
    ) {
    this.RoleOfUser=new Array;
    this.ListOfRoles=new Array;
    this.listOfRoleKey=new Array;
    this.listDeleteRoles=new Array;
  }
  ngOnInit(): void {
    this.getAllRoles();
  }

  async createComponents() {
    await this.repo.getRoles();

    this.firsttime = true;
    if(this.userRoles != undefined || this.userRoles != null){
      this.userRoles.forEach(obj => {
        this.createComponent(1);
      });
    }
  
  }
  get roles(): RolesData[] {
    return this.repo.roles;
  }
  get userRoles(): RolesData[] {
   return this.repo.dynamicUserRoles;
  }
 
  set userRoles(value: RolesData[]) {
   this.userRoles = value;
  }
  get user(): UserData {
    return this.userRepo.user;
  }
 

  createComponent(flag:number) {
     
    if(flag == 2){
      this._UsersComponent.ChangeFlagEnable();
    }
    let componentFactory = this.CFR.resolveComponentFactory(AddRoleComponent);


    let childComponentRef = this.VCR.createComponent(componentFactory);

    let childComponent = childComponentRef.instance;
    childComponent.unique_key = this.child_unique_key++;
    childComponent.parentRef = this;
    if (this.userRoles != undefined ) {

      if (this.userRoles.length > 0 && this.firsttime) {
        if(childComponent.unique_key >=  this.userRoles.length){
          childComponent.selectedObject={
            roleKey: null
           };
        }else{
          childComponent.selectedObject = this.userRoles[childComponent.unique_key];
      }
      }
    }else{
      childComponent.selectedObject={
        roleKey: null
       };
    }
    if(this.userRoles != undefined  ){
      if(this.userRoles.length == 0)
      childComponent.selectedObject={
        roleKey: null
       };
    }

    // add reference for newly created component
    this.componentsReferences.push(childComponentRef);

  }
  public remove(key: number) {
    var i = 0;
    if (key == 0) {
      i=1;
    } else {
      i = key-1;
    }
  this.repo.dynamicUserRoles.splice(key, 1);
    if (this.VCR.length < 1) return;

    let componentRef = this.componentsReferences.filter(
      x => x.instance.unique_key == key
    )[0];
    componentRef.destroy();
    this.componentsReferences = this.componentsReferences.filter(
      x => x.instance.unique_key !== key
    );
  }
  save() {
     
    const key = 'roleKey';
    const unique = [...new Map(this.repo.dynamicUserRoles.map(item =>
      [item[key], item])).values()];

    this.userRolesDataRequest = { userId: this.user.uKey, userRoles: unique }
    this._RoleService.saveUserRoles(this.userRolesDataRequest).subscribe(
      (res:any)=>{
        if(res.succeeded){
          this.repo.getUserRoles();
          this.notifications.create('Success', res.message, NotificationType.Success, { theClass: 'outline primary', timeOut: 6000, showProgressBar: false });
        }else{
          this.notifications.create('Error', res.message, NotificationType.Bare, { theClass: 'outline primary', timeOut: 6000, showProgressBar: false });
        }
      });

  }
  remove_me(){

  }

  onAddNewItem(){
    if(this.RoleOfUser.length < this.ListOfRoles.length){
      let site=new RolesData();
      site.id=this.counter;
      site.roleKey=null;
      site.name=null;
      site.orgKey=1;
      site.listOfRoles=this.roles;
      this.RoleOfUser.push(site);
     this.counter++
      this.spliceSelectedROles();
    }
  }

  getAllRoles(){
    this._RoleService.GetAllRoles().subscribe(res=>{
      this.ListOfRoles=res.rolesDataList;
    this.GetUserRoles();
    })
  }
 

  GetUserRoles(){
    if(this.repo.dynamicUserRoles == null){
      this._RoleService.GetUserRoles(this.childMessage.uKey).subscribe(res=>{
        res.userRoles.forEach(element => {
          debugger
          let Role=new RolesData();
          Role.id=this.counter;
          Role.roleKey=element.roleKey;
          Role.name=element.name;
          Role.orgKey=element.orgKey;
          Role.createdBy=element.createdBy;
          Role.createdDate=element.createdDate;
          Role.description=element.description;
          Role.listOfRoles=this.ListOfRoles;
          this.RoleOfUser.push(Role);
          let selectedUserSite = { Rkey: Role.roleKey, key: Role.id }
           this.listOfRoleKey.push(selectedUserSite);
         this.counter++
        });
        
        this.spliceSelectedROles();
      })
    }else{
      this.repo.dynamicUserRoles.forEach(element => {
        debugger
        let Role=new RolesData();
        Role.id=this.counter;
        Role.roleKey=element.roleKey;
        Role.name=element.name;
        Role.orgKey=element.orgKey;
        Role.createdBy=element.createdBy;
        Role.createdDate=element.createdDate;
        Role.description=element.description;
        Role.listOfRoles=this.ListOfRoles;
        this.RoleOfUser.push(Role);
        let selectedUserSite = { Rkey: Role.roleKey, key: Role.id }
         this.listOfRoleKey.push(selectedUserSite);
       this.counter++
      });
      
      this.spliceSelectedROles();
    }
 
  }

  spliceSelectedROles(){
    this.RoleOfUser.forEach(element => {
      element.listOfRoles = this.ListOfRoles.map(x => x)
      this.listOfRoleKey.forEach(role => {   
        if (element.id != role.key) {
          element.listOfRoles = element.listOfRoles.filter(x => x.roleKey != role.Rkey);
        }
      });
    });
    this.repo.dynamicUserRoles =this.RoleOfUser;
    console.log("this.RoleOfUser",this.RoleOfUser);
  }

  
  SelectRole(rKey, id) {
    
    this.listOfRoleKey = this.listOfRoleKey.filter(x => x.key != id);
    let selectedUserSite = { Rkey: rKey, key: id }
    this.listOfRoleKey.push(selectedUserSite);
   this.spliceSelectedROles();
   this.changeFlagEnable();
 
  }
  changeFlagEnable(){
    this._UsersComponent.ChangeFlagEnable();
  }

  deleteSelectedRole(id){
    this.listDeleteRoles.push(id);
    let demoList:any=[];
    this.RoleOfUser.forEach(element => {
      let item =this.listDeleteRoles.find(x=>x == element.id)
      if(item == null || item == undefined){
        demoList.push(element);
      }
      this.listOfRoleKey = this.listOfRoleKey.filter(x => x.key != item);
    });
   
    this.RoleOfUser=demoList.map(x=>x);
    this.listDeleteRoles=[];
    this.spliceSelectedROles();
    this.changeFlagEnable();

  }
}
