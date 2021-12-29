import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Repository } from '../../../data/repository';
import { UserData } from '../../../../models/responses/userDataResponse';
import { userSitesDataRequest } from '../../../../models/requests/UserSitesDataRequest';
import { SitesRepository } from '../../../data/sitesRepository';
import { RolesRepository } from '../../../data/roleRepository';
import { userRolesDataRequest } from '../../../../models/requests/userRolesDataRequest';
import {Subscription} from 'rxjs';
import { SharedataService } from '../service/sharedata.service';
@Component({
  selector: "users-topnav",
  styleUrls: ['./users.topnav.component.scss'],
  templateUrl: "./users.topnav.component.html"
})
export class UsersTopNavComponent {
  clickEventSubscription:Subscription;
  tabName:string;
  constructor(private sharedService:SharedataService,private rolesRepo: RolesRepository, private siteRepo: SitesRepository, private repo: Repository) {
    this.tabName="HR";
    this.clickEventSubscription= this.sharedService.getClickEvent().subscribe(()=>{
      this.incrementCount();
    })
  }
  count:number=0;
  incrementCount(){
    this.count++;
    this.tabName="HR";
  }
  userSitesDataRequest: userSitesDataRequest = {};
  userRolesDataRequest: userRolesDataRequest = {};

  setShowForm() {
    this.repo.showSites = false;
    this.repo.showRoles = false;
    this.repo.showForm = true;
    this.tabName='HR';

  }
  setShowSites() {
    this.repo.showRoles = false;
    this.repo.showForm = false;
    this.repo.showSites = true;
    this.tabName="Sites";

  }
  setShowRoles() {
    this.repo.showForm = false;
    this.repo.showSites = false;
    this.repo.showRoles = true;
    this.tabName='Roles';
  }
  get user(): UserData {
    return this.repo.user;
  }
  get showInfoForm() {
    return this.repo.showForm;
  }
  get showSites() {
    return this.repo.showSites;
  }
  get showRoles() {
    return this.repo.showRoles;
  }
  //async saveUser() {
  //  // this.user.imagePath = this.response.dbPath;
  //  await this.repo.saveUser(this.user);
  //  // this.repo.getUsers();
  //  await this.saveUserSites();
  //  await this.saveUserRoles();

  //}

/*  deleteUser() {
    this.repo.deleteUser(this.user.uId);
  }
*/
  /*saveUserSites() {
    for (let j = 0; j < this.siteRepo.dynamicUserSites.length; j++) {
      if (this.siteRepo.userSites.filter(item => item.name !== this.siteRepo.dynamicUserSites[j].name).length == 0) {
        this.siteRepo.userSites.push(this.siteRepo.dynamicUserSites[j]);
      }

    }
    this.userSitesDataRequest = { userId: this.user.uId, userSites: this.siteRepo.userSites }
    this.siteRepo.saveUserSites(this.userSitesDataRequest);

  }
  saveUserRoles() {
    for (let j = 0; j < this.rolesRepo.dynamicUserRoles.length; j++) {
      if (this.rolesRepo.userRoles.filter(item => item.name !== this.rolesRepo.dynamicUserRoles[j].name).length == 0) {
        this.rolesRepo.userRoles.push(this.rolesRepo.dynamicUserRoles[j]);
      }

    }
    this.userRolesDataRequest = { userId: this.user.uId, userSites: this.rolesRepo.userRoles }
    this.rolesRepo.saveUserRoles(this.userRolesDataRequest);

  }*/
}
