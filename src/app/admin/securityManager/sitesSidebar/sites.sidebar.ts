import { RolesData } from "../../../../models/responses/rolesDataResponse";
import { SitesRepository } from '../../../data/sitesRepository';
import { Repository } from '../../../data/repository';
import { SitesData } from '../../../../models/responses/sitesDataResponse';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { SitesService } from "src/services/SitesService";
import { ToastrService } from "ngx-toastr";
import { TranslateService } from "@ngx-translate/core";
declare var hideModal:any;

@Component({
  selector: "sites-sidebar",
  templateUrl: "./sites.sidebar.component.html",
  styleUrls: ['./sites.sidebar.component.scss']
})
export class SitesSidebarComponent  {
  public config: PerfectScrollbarConfigInterface = {};
  public newSearch: any="";
  Sites:SitesData[];
  AddNewFlag : boolean;
  @Output () AddNewEvent= new EventEmitter<any>();
  @Output() GetUsersListEvent = new EventEmitter<any>();
  @Input() ChildDeleteElementFlag: any={flag:false};
  @Input() ChildSaveFlag: any;
  get entityIsClicked(): boolean {
    return this.siteServ.entityIsClicked;
  }
  get sites(): SitesData[] {
    return this.repo.sites;
  }
  get siteData(): SitesData {
    return this.siteServ.siteRequest;
  }
  constructor(private translateService: TranslateService,private repo: SitesRepository, private userRepo: Repository,private siteServ:SitesService,private toastr: ToastrService) {
  }
 
  ngOnInit(): void {
    this.GetAllSites();
   };

   GetAllSites(){
    this.siteServ.GetAllSitesSearch(this.newSearch).subscribe(
      (res:any)=>{ 
        this.Sites=res.sitesDataList;
        this.siteServ.entityIsClicked =true;
        if(this.siteData==undefined)
        this.setSite({});
        else{
          this.setSite( this.Sites.find(x=>x.name == this.siteData.name) );
        }
      }
    
   ) 
  }
  CopySite(){
    this.siteServ.CopySites().subscribe(
      (res:any)=>
    {  
      if(res==true){
    }
    this.GetAllSites();
    });  
  }
  ngOnChanges() {
    if(this.ChildDeleteElementFlag != undefined){
      if(this.ChildDeleteElementFlag?.flag==true){
        this.siteServ.entityIsClicked =false;
        hideModal("DeleteRole");
        this.siteServ.siteRequest =undefined;
       this.GetAllSites();
       this. hideAll();

      }
    }
 
   if(this.ChildSaveFlag != undefined){
    if(this.ChildSaveFlag?.flag==true)
    this.GetAllSites();
   }
  }


  Deselect(){
    this.siteServ.AllUsers=null;
    this.setSite({});
    this.AddNewFlag=false;
    this.siteServ.entityIsClicked =false;
    this.AddNewEvent.emit(this.AddNewFlag)
  }

  AddNew() {
    this.setSite({});
    this.AddNewFlag=true;
    this.AddNewEvent.emit(this.AddNewFlag)
    this.AddNewFlag=false;
    this.siteServ.entityIsClicked =true;
    

  }
  public setSearch() {
    this.siteServ.siteRequest =undefined;
    this.GetAllSites();
  }
  setSite(siteData: SitesData) {
    if(siteData != undefined){
      this.siteServ.entityIsClicked = true;
      this.siteServ.showInfoForm = true;
    }
    var copySite= Object.assign({}, siteData)
    this.siteServ.setSite(copySite);
    this.AddNewFlag=false;
    this.AddNewEvent.emit(this.AddNewFlag)
    if(Object.keys(siteData)?.length === 0){
      this.GetUsersListEvent.emit( this.siteServ.siteUsers)
      this.siteServ.entityIsClicked= false;
    }
    else{
      this.siteServ.GetAllUsersForOneSites().subscribe((res:any)=>{ 
        this.siteServ.siteUsers=res.siteUsers;
        this.GetUsersListEvent.emit( this.siteServ.siteUsers)
        this.siteServ.entityIsClicked= true;
      });
    }
  }
 
  hideAll() {
    this.repo.entityIsClicked = false;
    this.repo.showInfoForm = false;
    this.repo.showUsers = false;
  }
}
