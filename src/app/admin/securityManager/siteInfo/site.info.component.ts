import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SitesRepository } from '../../../data/sitesRepository';
import { SitesData } from '../../../../models/responses/sitesDataResponse';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { DataService, Person } from 'src/app/data.service';
import { UserData } from 'src/models/responses/userDataResponse';
import { SitesService } from 'src/services/SitesService';
import { UserService } from 'src/services/userservice';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: "site-info",
  templateUrl: "./site.info.component.html",
  styleUrls: ['./site.info.component.scss'],
})
export class SiteInfoComponent {
  openLg(content4) {
  
		this.modalService.open(content4, { size: 'lg' });
    
	}
  DisabledSaveBtn:boolean=false;
  DisabledDeleteBtn:boolean=false;
  AllUsers :UserData[];
  selectedPeople1:UserData[] = [];;
  selectedPeople2: UserData[] = [];;
  people1:any=[];
  people2:any=[];
  DeleteChange:any={flag:false};
  names: any;
  @Input() ChildUsers: UserData[];

  @Input() ChildAddNewFlag?: boolean;
  @Output() DeleteElementEvent = new EventEmitter<any>();
  @Output () SaveEvent = new EventEmitter<any>();
  SaveFlag:any;
  selectedAll: any;
  get siteRequest(): SitesData {
    return this.siteServ.siteRequest;
  }
  constructor(private translateService: TranslateService,private toastr: ToastrService,private modalService: NgbModal,private repo: SitesRepository, private notifications: NotificationsService,private siteServ:SitesService,private usersServ:UserService) {
  }

  getAllUsers(){
    
    this.usersServ.GetAllUsers().subscribe(
      (res:any)=>{ 
        this.AllUsers= res.userDataList
        this.ChildUsers.forEach(element => {
          this.AllUsers=this.AllUsers.filter(x=>x.uKey != element.uKey);
      });
        this.siteServ.AllUsers=res.userDataList;
      }
    
   ) 
  }
 
  ngOnChanges(){
    if( this.ChildAddNewFlag==true){
      this.DisabledDeleteBtn =true;
        this. getAllUsers();
        this.selectedPeople1 = [];
        this.selectedPeople2 = [];
        this.ChildUsers=[];
    }
    else if(this.ChildUsers != undefined ){
        this.people1=this.ChildUsers.map(x=>x);
        this.getAllUsers();
        this.DisabledSaveBtn=true;
    }
    else{
      this.ChildUsers=null;
      this.AllUsers=null;
      this.selectedPeople1 = [];
      this.selectedPeople2 = [];
      
    }
    this.DisabledDeleteBtn=false;

  }
  saveSite() {
    this.SaveFlag=false;
    this.DeleteChange.flag=false;
    this.siteRequest.SiteUsers = this.ChildUsers;
    this.siteServ.siteRequest=  this.siteRequest;
    var res = this.siteServ.AddSitesWithUsers().subscribe((res)=>{
      if (res ===true) {
        this.toastr.success(this.translateService.instant('sites.SiteIsSavedSuccessfully'), 'Success');
        this.SaveFlag={flag :true};
        this.siteServ.entityIsClicked=true;
        this.SaveEvent.emit(this.SaveFlag);
      } else 
       {
        this.toastr.error(this.translateService.instant("sites.Can'tRepeteSitename"), 'Error');
      }
     });
    }
  resetForm() {
  }

  ngOnInit() {
    this.DisabledSaveBtn = true;
    this.DisabledDeleteBtn=false;
  }
  moveSelectedList(){
    if(this.selectedPeople2 != undefined){
        let UsersInRole:any=[];
        let AllUsersIHave:any=this.AllUsers.map(x=>x)
        this.selectedPeople2.forEach(element => {
              
            let elementAdd=this.AllUsers.find(x=>x.uKey == element);
            if(elementAdd != undefined)
            UsersInRole.push(elementAdd);
            
            AllUsersIHave=AllUsersIHave.filter(x=>x.uKey != element);
            this.selectedPeople2=undefined;
        });
        this.ChildUsers = [...this.ChildUsers,...UsersInRole]
        this.AllUsers = [...AllUsersIHave]
    }
    this.DisabledSaveBtn = false;
  
  }
  
  moveSelectedList2(){
      if(this.selectedPeople1 != undefined){
          let demoLisAdd:any=[];
          let Depeople1:any=this.ChildUsers.map(x=>x)
          this.selectedPeople1.forEach(element => {
                
              let elementAdd=this.ChildUsers.find(x=>x.uKey == element);
              if(elementAdd != undefined)
              demoLisAdd.push(elementAdd);
              Depeople1=Depeople1.filter(x=>x.uKey != element);
              this.selectedPeople1=undefined;
          });
          this.AllUsers = [...this.AllUsers,...demoLisAdd]
          this.ChildUsers = [...Depeople1]
      }
      this.DisabledSaveBtn = false;
  }
  DeleteSiteWithUsers(){
    this.siteRequest.SiteUsers = this.ChildUsers;
    this.DeleteChange={flag:false};
    this.siteServ.DeleteSites().subscribe(
      (res:any)=>{ 
        this.toastr.success(this.translateService.instant('sites.SiteIsDeletedSuccessfully'), 'Success');
        this.DeleteChange.flag=true;
        this.DeleteElementEvent.emit(this.DeleteChange);
        this.modalService.dismissAll();
      }
    ) 
  }

}