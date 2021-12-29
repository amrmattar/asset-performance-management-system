import { Component, ViewChild, ComponentRef, ViewContainerRef, ComponentFactoryResolver, ComponentFactory, Input, AfterViewInit, OnInit } from '@angular/core';
import { SitesRepository } from '../../../data/sitesRepository';
import { SitesData } from '../../../../models/responses/sitesDataResponse';
import { AddSiteComponent } from '../addSite/add.site';
import { UserData } from '../../../../models/responses/userDataResponse';
import { Repository } from '../../../data/repository';
import { Guid } from 'guid-typescript';
import { userSitesDataRequest } from '../../../../models/requests/UserSitesDataRequest';
import { __await } from 'tslib';
import { EventEmitterService } from '../../../../services/event-emitter.service';
import { SiteInfoComponent } from '../siteInfo/site.info.component';
import { SitesService } from 'src/services/SitesService';

@Component({
  selector: "sites",
  templateUrl: "./sites.html",
  styleUrls: ['./sites.scss'],
})
export class SitesComponent{
  DeleteElementFlag: any={flag:false};
  AddNewFlag:boolean;
  ParentSaveFlag:any;

  selectedObject: SitesData = {};
  userSites: SitesData[];
  userSitesDataRequest: userSitesDataRequest = {};
  firsttime: boolean = false;

  get sites(): SitesData[] {
    return this.repo.sites;
  }

  get user(): UserData {
    return this.userRepo.user;
  }

  get showInfoForm(): boolean {
    return this.siteServ.showInfoForm;
  }
  get showUsers(): boolean {
    return this.repo.showUsers;
  }
 
  get entityIsClicked(): boolean {
    return this.siteServ.entityIsClicked;
  }

  constructor(private repo: SitesRepository, private userRepo: Repository ,private siteServ:SitesService) {
    this.repo.getSites();
    this.userRepo.getUsers();

  }
 
  
  DeleteElement($event) {
    this.DeleteElementFlag = $event
  }
  AddNew($event) {
    this.AddNewFlag = $event
  }
  Save($event) {
    this.ParentSaveFlag = $event
  }
  GetUsers($event) {
    this.userSites = $event
  }
}
