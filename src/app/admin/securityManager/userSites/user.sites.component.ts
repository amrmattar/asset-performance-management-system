import { Component, ViewChild, ComponentRef, ViewContainerRef, ComponentFactoryResolver, ComponentFactory, Input, AfterViewInit, OnInit } from '@angular/core';

import { SitesData } from '../../../../models/responses/sitesDataResponse';
import { AddSiteComponent } from '../addSite/add.site';
import { UserData } from '../../../../models/responses/userDataResponse';

import { userSitesDataRequest } from '../../../../models/requests/UserSitesDataRequest';
import { __await } from 'tslib';

import { NotificationsService, NotificationType } from 'angular2-notifications';
import { SitesService } from 'src/services/SitesService';
import { UsersComponent } from '../Users/users.component';
import { Repository } from 'src/app/data/repository';
import { EventEmitterService } from 'src/services/event-emitter.service';
import { SitesRepository } from 'src/app/data/sitesRepository';

@Component({
  selector: "user-sites",
  templateUrl: "./user.sites.component.html",
  styleUrls: ['./user.sites.component.scss'],
  providers: [SitesService]
})
export class UserSitesComponent implements OnInit {
  @Input() childMessage: any;
  listDeleteSites:any=[];
  sites:any=[];
  listOfSiteKey:any=[];
  SitesOfUser:SitesData[];
  //userSites: SitesData[];
  userSitesDataRequest: userSitesDataRequest = {};
  child_unique_key: number = 0;
  firsttime: boolean = false;
  componentsReferences: Array<ComponentRef<AddSiteComponent>> = [];

  @ViewChild("viewContainerRef", { read: ViewContainerRef })
  VCR: ViewContainerRef;
  constructor(private repo: SitesRepository, private userRepo: Repository, private CFR: ComponentFactoryResolver,
    private eventEmitterService: EventEmitterService, private notifications: NotificationsService,
    private _SitesService:SitesService,private _UsersComponent:UsersComponent,
    private _SitesRepository:SitesRepository,

  ) {
    this.SitesOfUser=new Array<SitesData>();
    this.sites=new Array;
    this.listOfSiteKey=new Array;
    this.listDeleteSites=new Array;
  }
  ngOnInit(): void {
    this.GetAllSites();
  }

  async createComponents() {
      await  this.repo.getSites();
     this.firsttime = true;
     if(this.userSites != null || this.userSites != undefined)
    this.userSites.forEach(obj => {
      this.createComponent(1);
    });
  }


  get user(): UserData {
    return this.userRepo.user;
  }
  createComponent(typeOfCreate:any) {
     
    if(typeOfCreate == 2){
        this._UsersComponent.ChangeFlagEnable();
    }
    let componentFactory = this.CFR.resolveComponentFactory(AddSiteComponent);

    let childComponentRef = this.VCR.createComponent(componentFactory);

    let childComponent = childComponentRef.instance;
    childComponent.unique_key = this.child_unique_key++;
    childComponent.parentRef = this;
    if (this.userSites != undefined) {

      if (this.userSites.length > 0 && this.firsttime) {
        if(childComponent.unique_key >=  this.userSites.length){
          childComponent.selectedObject={
            skey:null,
            name:null,
            orgKey:null,
            listOfSites:[]
          };
        }else{
          childComponent.selectedObject = this.userSites[childComponent.unique_key];
        }
      }
    } 
    this.componentsReferences.push(childComponentRef);
    

  }
  public remove(key: number) {
    
    var i = key;
    if (i == 0) {
      i++;
    }
     this.repo.dynamicUserSites =this.repo.dynamicUserSites.filter(x=>x.unique_key != key); 
    if (this.VCR.length < 1) return;
    let componentRef = this.componentsReferences.filter(x => x.instance.unique_key == key )[0];
   componentRef.destroy();
    this.componentsReferences = this.componentsReferences.filter(
      x => x.instance.unique_key !== key
    );
   

  }
  get userSites(): SitesData[] {
    return this.repo.dynamicUserSites;
  }
  set userSites(value: SitesData[]) { 
    this.userSites = value;
  }

  save() {
     
    const key = 'skey';
    const unique = [...new Map(this.repo.dynamicUserSites.map(item =>
      [item[key], item])).values()];

    this.userSitesDataRequest = { userId: this.user.uKey, userSites: unique }
    this._SitesService.saveUserSites(this.userSitesDataRequest).subscribe(
      (res:any)=>{
        if(res.succeeded){
          this.repo.getUserSites();
          this.notifications.create('Success', res.message, NotificationType.Success, { theClass: 'outline primary', timeOut: 6000, showProgressBar: false });
        }else{
          this.notifications.create('Error', res.message, NotificationType.Bare, { theClass: 'outline primary', timeOut: 6000, showProgressBar: false });
        }
      });

  }

  spliceSelectedSites(){
    
    this.SitesOfUser.forEach(element => {
      element.listOfSites = this.sites.map(x => x)
      this.listOfSiteKey.forEach(site => {   
        if (element.id != site.key) {
          element.listOfSites = element.listOfSites.filter(x => x.skey != site.skey);
        }
      });
    });
    this._SitesRepository.dynamicUserSites=this.SitesOfUser;
  }
  counter=1;
  GetUserSites(){
    if(this._SitesRepository.dynamicUserSites == null){
      this._SitesService.getUserSites(this.childMessage.uKey).subscribe(res=>{
        res.sites.forEach(element => {
          let site=new SitesData();
          site.id=this.counter;
          site.skey=element.skey;
          site.name=element.name;
          site.orgKey=element.orgKey;
          site.listOfSites=this.sites;
          this.SitesOfUser.push(site);
          let selectedUserSite = { skey: site.skey, key: site.id }
           this.listOfSiteKey.push(selectedUserSite);
         this.counter++
        });
        
        this.spliceSelectedSites();
      })
    }else{
      this._SitesRepository.dynamicUserSites.forEach(element => {
        let site=new SitesData();
        site.id=this.counter;
        site.skey=element.skey;
        site.name=element.name;
        site.orgKey=element.orgKey;
        site.listOfSites=this.sites;
        this.SitesOfUser.push(site);
        let selectedUserSite = { skey: site.skey, key: site.id }
         this.listOfSiteKey.push(selectedUserSite);
       this.counter++
      });
      
      this.spliceSelectedSites();

    }
   
  }

  GetAllSites(){
    
    this._SitesService.GetAllSites().subscribe(res=>{
      this.sites=res.sitesDataList;
      this.GetUserSites();
    })
  }

  onAddNewItem(){
    if(this.SitesOfUser.length < this.sites.length){
      let site=new SitesData();
      site.id=this.counter;
      site.skey=null;
      site.name=null;
      site.orgKey=1;
      site.listOfSites=this.sites;
      this.SitesOfUser.push(site);
     this.counter++
      this.spliceSelectedSites();
    }
    
  }

  SelectSite(siteKey, id) {
    
    this.listOfSiteKey = this.listOfSiteKey.filter(x => x.key != id);
    let selectedUserSite = { skey: siteKey, key: id }
    this.listOfSiteKey.push(selectedUserSite);
   this.spliceSelectedSites();
   this.changeFlagEnable();
 
  }

  changeFlagEnable(){
    this._UsersComponent.ChangeFlagEnable();
  }
  deleteSelectedSites(id){
    this.listDeleteSites.push(id);
    let demoList:any=[];
    this.SitesOfUser.forEach(element => {
  
      let item =this.listDeleteSites.find(x=>x == element.id)
      if(item == null || item == undefined){
        demoList.push(element);
      }
      this.listOfSiteKey = this.listOfSiteKey.filter(x => x.key != item);
    });
   
    this.SitesOfUser=demoList.map(x=>x);
    this.listDeleteSites=[];
    this.spliceSelectedSites();
    this.changeFlagEnable();

  }
}
