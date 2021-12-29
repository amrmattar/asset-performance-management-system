import { RolesRepository } from "../../../data/roleRepository";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { Repository } from "../../../data/repository";
import { RolesData } from "../../../../models/responses/rolesDataResponse";
import { RolesServeice } from "src/services/RolesService";
import { UserData } from "src/app/models/responses/userDataResponse";

import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { ToastrService } from "ngx-toastr";
import { TranslateService } from "@ngx-translate/core";
declare var hideModal:any;

@Component({
  selector: "roles-sidebar",
  templateUrl: "./roles.sidebar.component.html",
  styleUrls: ['./roles.sidebar.component.scss'],
})
export class RolesSidebarComponent  {
  public config: PerfectScrollbarConfigInterface = {};
  newSearch:any="";
  roles: RolesData[];
  AddNewFlag : boolean=false;
  @Input() ChildSaveFlag: any;
  @Output() GetUsersListEvent = new EventEmitter<any>();
  @Output () AddNewEvent= new EventEmitter<any>();
  @Input() ChildDeleteElementFlag: any={flag:false,res:false};

  get roleRequest(): RolesData {
    return this.rolesServ.roleRequest;
  }
  get showInfoForm(): boolean {
    return this.rolesServ.entityIsClicked;
  }
  constructor(private translateService: TranslateService, private rolesServ:RolesServeice,private toastr: ToastrService) {
   this.roles = new Array<RolesData>();

  }
 

  public setSearch() {
    this.GetAllRoles();  
  }
  setRole(roleData: RolesData) {
    var copyRole= Object.assign({}, roleData)
    this.rolesServ.setRole(copyRole);
    if(Object.keys(roleData)?.length === 0){
      this.GetUsersListEvent.emit( this.rolesServ.roleUsers)
      this.rolesServ.entityIsClicked= false;
    }
    else{
      this.rolesServ.GetAllUsersForOneRole().subscribe((res:any)=>{ 
        this.rolesServ.roleUsers=res.roleUsers;
        this.GetUsersListEvent.emit( this.rolesServ.roleUsers)
        this.rolesServ.entityIsClicked= true;
      });
    this.AddNewFlag= false;
    this.AddNewEvent.emit(this.AddNewFlag)
  
    }
      
    
  }
  ngOnChanges() {
    if(this.ChildDeleteElementFlag != undefined){
      if(this.ChildDeleteElementFlag?.flag==true){
        hideModal("DeleteRole");
          this.GetAllRoles();
          this.setRole({});
       }
    }
    if(this.ChildSaveFlag != undefined){
      if(this.ChildSaveFlag?.flag==true){
        this.GetAllRoles();
        if(this.ChildSaveFlag?.res==false)
        this.setRole({});
    
      }
  
   }
  }
  CopyRole(){
    this.rolesServ.CopyRole().subscribe((res:any)=>{  
      this.GetAllRoles();
        });  
  }
  AddNew() {
    this.setRole({});
    this.AddNewFlag=true;
    this.AddNewEvent.emit(this.AddNewFlag)
    this.AddNewFlag=false;
    this.rolesServ.entityIsClicked =true;
  }
  Deselect(){
      this.rolesServ.AllUsers=null;
    this.setRole({});
    this.AddNewFlag=false;
    this.rolesServ.entityIsClicked =false;
    this.AddNewEvent.emit(this.AddNewFlag)
  }
  GetAllRoles(){
    this.rolesServ.GetAllRolesSearch(this.newSearch).subscribe(
      (res:any)=>{ 
        this.roles=res.rolesDataList;
        if(this.roleRequest==undefined)
        this.setRole(this.roles[0]);
        else
        this.setRole( this.roles.find(x=>x.name == this.roleRequest.name) );
      }
   ) 
  }

  ngOnInit(): void {
    this.newSearch=""
    this.GetAllRoles();
   };
  
}
