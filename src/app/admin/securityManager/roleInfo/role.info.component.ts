import { RolesRepository } from '../../../data/roleRepository';
import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { RolesData } from '../../../../models/responses/rolesDataResponse';
import { NotificationType, NotificationsService } from 'angular2-notifications';
import { map, filter } from 'rxjs/operators';
import { DataService, Person } from 'src/app/data.service';
import { element } from 'protractor';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { RolesServeice } from 'src/services/RolesService';
import { UserData } from 'src/models/responses/userDataResponse';
import { UserService } from 'src/services/userservice';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: "role-info",
  templateUrl: "./role.info.component.html",
  styleUrls: ['./roles.info.component.scss']
})

export class RoleInfoComponent implements OnInit,OnChanges {
 
  @Output() DeleteElementEvent = new EventEmitter<any>();

  @Input() ChildUsers: UserData[];
  @Input() ChildAddNewFlag?: boolean;

  AllUsers :UserData[];
  selectedPeople1: UserData[] = [];
  selectedPeople2: UserData[] = [];
  people1:any=[];
  people2:any=[];
  @Output () SaveEvent = new EventEmitter<any>();
  SaveFlag:any;
  names: any;
  selectedAll: any;
  DisabledDeleteButton:boolean=false;
  DisabledSaveButton:boolean=false;
  DeleteChange:any={flag:false};

  constructor(private translateService: TranslateService,private modalService: NgbModal,private repo: RolesRepository,private dataService: DataService, private notifications: NotificationsService,private rolesServ:RolesServeice,private usersServ:UserService,private toastr: ToastrService) {
  }
  openLg(content3) {
  
		this.modalService.open(content3, { size: 'lg' });
    
	}


  getAllUsers(){
    this.usersServ.GetAllUsers().subscribe(
      (res:any)=>{ 
        this.AllUsers= res.userDataList
        this.ChildUsers.forEach(element => {
          this.AllUsers=this.AllUsers.filter(x=>x.uKey != element.uKey);

      });
        this.rolesServ.AllUsers=res.userDataList;
  
      }
    
   ) 
  }


  DeleteRoleWithUsers(){
    this.DeleteChange={flag:false};
    this.rolesServ.DeleteRole().subscribe(
      (res:any)=>{ 
        this.toastr.success(this.translateService.instant('roles.RoleIsDeletedSuccessfully'), 'Success');
        this.DeleteChange.flag=true;
        this.DeleteElementEvent.emit(this.DeleteChange);
        this.modalService.dismissAll();
       
      
      }
    
   ) 
  }


  ngOnChanges(){
    if( this.ChildAddNewFlag==true){
        this. getAllUsers();
        this.selectedPeople1 = [];
        this.selectedPeople2 = [];
        this.ChildUsers=[];
    }
    else if(this.ChildUsers != undefined ){
        this.people1=this.ChildUsers.map(x=>x);
        this. getAllUsers();
    }
    else{
      this.ChildUsers=null;
      this.AllUsers=null;
      this.selectedPeople1 = [];
      this.selectedPeople2 = [];
    }
   this.DisabledSaveButton =true;
  }



  get roleRequest(): RolesData {
    return this.rolesServ.roleRequest;
  }


  resetForm() {
    this.rolesServ.setRole({});
    var roleInfoForm = <HTMLFormElement>document.getElementById('roleInfoForm');
    roleInfoForm.reset();
    this.DisabledDeleteButton =true;
  }


  saveRole() {
    this.roleRequest.RoleUsers = this.ChildUsers;
    this.rolesServ.roleRequest=  this.roleRequest;
    var res =  this.rolesServ.AddRoleWithUsers().subscribe((res)=>{
    if(res ==false ){
      this.SaveFlag={res:false};
      this.SaveEvent.emit(this.SaveFlag);
    }
    else{
      this.SaveFlag={flag :true};
      this.SaveEvent.emit(this.SaveFlag);
      this.rolesServ.entityIsClicked=true;
      this.SaveFlag={flag :false};

    }
    if (res ===true) {
      this.toastr.success(this.translateService.instant('roles.RoleIsSavedSuccessfully'), 'Success');
    } else 
     {
      this.toastr.error(this.translateService.instant("roles.Can'tRepeteRolename"), 'Error');

    }

   });
    
  }



ngOnInit() {
 
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
    this.DisabledSaveButton =false;
    
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
  this.DisabledSaveButton =false;
}
  }
