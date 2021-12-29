import { Component, ViewChild, ComponentRef, ViewContainerRef, ComponentFactoryResolver, ComponentFactory, Input, OnInit } from '@angular/core';
import { UserData } from '../../../../models/responses/userDataResponse';
import { Repository } from '../../../data/repository';
import { RolesRepository } from '../../../data/roleRepository';
import { userRolesDataRequest } from '../../../../models/requests/userRolesDataRequest';
import { RolesData } from '../../../../models/responses/rolesDataResponse';
import { AddRoleComponent } from '../addRole/add.role';
import { EventEmitterService } from '../../../../services/event-emitter.service';
import { RolesServeice } from 'src/services/RolesService';

@Component({
  selector: "roles",
  templateUrl: "./roles.html",
  styleUrls: ['./roles.scss'],
})
export class RolesComponent /*implements OnInit*/{
  selectedObject: RolesData = {};
  userRoles: RolesData[];
  userRolesDataRequest: userRolesDataRequest = {};

  firsttime: boolean = false;
  Users:UserData[];
  AddNewFlag:boolean;
  DeleteElementFlag:boolean;

  constructor(private repo: RolesRepository, private userRepo: Repository, private roleServ:RolesServeice ) {
    this.repo.getRoles();
    this.repo.getUserRoles();

  }
  ParentSaveFlag:any;

  get roles(): RolesData[] {
    return this.repo.roles;
  }

  get user(): UserData {
    return this.userRepo.user;
  }

  get entityIsClicked(): boolean {
    return this.roleServ.entityIsClicked;
  }

  get showInfoForm(): boolean {
    return this.roleServ.entityIsClicked;
  }

  get showUsers(): boolean {
    return this.repo.showUsers;
  }

  saveUserRoles() {
    for (let j = 0; j < this.repo.dynamicUserRoles.length; j++) {
      if (this.repo.userRoles.filter(item => item.name !== this.repo.dynamicUserRoles[j].name).length == 0) {
        this.repo.userRoles.push(this.repo.dynamicUserRoles[j]);
      }

    }
    this.userRolesDataRequest = { userId: this.user.uKey, userRoles: this.repo.userRoles }
    this.repo.saveUserRoles(this.userRolesDataRequest);

  }
  
  Save($event) {
    this.ParentSaveFlag = $event
  }
  
  AddNew($event) {
    this.AddNewFlag = $event
  }

  DeleteElement($event) {
    this.DeleteElementFlag = $event
  }
 
  GetUsers($event) {
    this.Users = $event
  }
  
}
