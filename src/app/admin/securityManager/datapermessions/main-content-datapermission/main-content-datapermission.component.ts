import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { TableIds } from 'src/models/responses/systable';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { SecRoleDef } from 'src/app/models/SecRoleDef';
import { RolesServeice } from 'src/services/RolesService';
import { RolesData } from 'src/models/responses/rolesDataResponse';
import { RoleDefService } from 'src/services/RoleDefService';
import { Result } from 'src/models/responses/Result';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
declare var hideModal:any;
declare var showModal:any;
@Component({
  selector: 'app-main-content-datapermission',
  templateUrl: './main-content-datapermission.component.html',
  styleUrls: ['./main-content-datapermission.component.scss'],
  providers:[RolesServeice,RoleDefService]
})
export class MainContentDatapermissionComponent implements OnInit,OnChanges {
  @Input() tableData: TableIds;
  closeResult: string;
  SecRoleDefList:SecRoleDef[]=[];
  listDeleteDataPermsission:any[]=[];
  rolesDataList:RolesData[]=[];
  listOfRoleKey:any;
  MapSecRoleDefList:SecRoleDef[]=[];
  tables:any[];
  first = 0;

  rows = 10;
  constructor(private translateService: TranslateService,private modalService: NgbModal,
              private _RolesServeice:RolesServeice,
              private _RoleDefService:RoleDefService,
              private toastr: ToastrService) 
  {
    this.SecRoleDefList=new Array<SecRoleDef>();
    this.MapSecRoleDefList=new Array<SecRoleDef>();
    this.listDeleteDataPermsission=new Array;
    this.rolesDataList=new Array<RolesData>();
    this.listOfRoleKey=new Array;
    this.tableData =new TableIds();
    this.tables=new Array;
  }
  openLg(content3,RoleKey:any) {
		this.modalService.open(content3, { size: 'lg' });
    this._RoleDefService.GetTablesByRoleKey(RoleKey).subscribe((res:Result)=>{
      console.log("tables",res);
      this.tables=res.model
    })
	}
  open2(content2) {
		this.modalService.open(content2, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
			this.closeResult = `Closed with: ${result}`;
		}, (reason) => {
			this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
		});
	}
  private getDismissReason(reason: any): string {
		if (reason === ModalDismissReasons.ESC) {
			return 'by pressing ESC';
		} else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
			return 'by clicking on a backdrop';
		} else {
			return  `with: ${reason}`;
		}
	}
  ngOnChanges(){
     
    console.log("message from side ",this.tableData)
    if(this.tableData != undefined){
      this.GetRoleDefByTableKey(this.tableData.tableKey);
    }
  }

  ngOnInit(): void {
    this.GetAllRoles();
  }

  Checked(id, event){
    console.log(event.currentTarget.checked);
    if(event.currentTarget.checked){
      this.listDeleteDataPermsission.push(id);
    }else{
      // this.listDeleteDataPermsission.splice(id, 1);
      this.listDeleteDataPermsission=this.listDeleteDataPermsission.filter(x=>x != id)
    }
  }
  
  InsertChecked(id, event){
    console.log(event.currentTarget.checked);
    let obj= this.SecRoleDefList.find(x=>x.id == id);
    if(event.currentTarget.checked){
     obj.canUpdate=true;
    }
  }
  counter=1;
  AddDataPermission(){
     
    let SecRoleDefObj=new SecRoleDef();
    SecRoleDefObj.rolesDataList=this.rolesDataList;
    SecRoleDefObj.roleKey= null;
    SecRoleDefObj.tableKey= this.tableData.tableKey;
    SecRoleDefObj.id=this.counter;
    SecRoleDefObj.canView = true;
    SecRoleDefObj.canInsert=false;
    SecRoleDefObj.canUpdate=false;
    SecRoleDefObj.canDelete=false;
    SecRoleDefObj.ptableKey=0;
    this.SecRoleDefList.push(SecRoleDefObj);
    this.counter ++;
    this.spliceSelectedROles();
    
  }


  deleteSelectedDatapermission(){
     
    let demoList:any=[];
    this.SecRoleDefList.forEach(element => {
       
      let item =this.listDeleteDataPermsission.find(x=>x == element.id)
      if(item == null || item == undefined){
        demoList.push(element);
      }
      this.listOfRoleKey = this.listOfRoleKey.filter(x => x.key != item);
    });
    this.spliceSelectedROles();
    this.SecRoleDefList=demoList.map(x=>x);
    this.listDeleteDataPermsission=[];
    hideModal("deleteDataPermissionModal");


  }

  GetAllRoles(){
    this._RolesServeice.GetAllRoles().subscribe((res:any)=>{
      this.rolesDataList=res.rolesDataList;
    })
  }

  SelectRole(roleKey, id) {
     
    this.listOfRoleKey = this.listOfRoleKey.filter(x => x.key != id);
    let selectedRoles = { roleKey: roleKey, key: id }
    this.listOfRoleKey.push(selectedRoles);
   this.spliceSelectedROles();
  }
  

  spliceSelectedROles(){
    this.SecRoleDefList.forEach(element => {
        
      element.rolesDataList = this.rolesDataList.map(x => x)
      this.listOfRoleKey.forEach(role => {
          
        if (element.id != role.key) {
          element.rolesDataList = element.rolesDataList.filter(x => x.roleKey != role.roleKey);
        }
      });
    });
  }


  saveDataPermission(){
    let secRoleDList:any[]=[];
    let SaveFalg=true;
    this.SecRoleDefList.forEach(element => {
      if(element.roleKey > 0 && element.ptableKey == 0){
        let SecRoleDefObj={
          tableKey:element.tableKey,
          roleKey:Number(element.roleKey),
          canView:element.canView,
          canInsert:element.canInsert,
          canUpdate:element.canUpdate,
          canDelete:element.canDelete,
        };
        secRoleDList.push(SecRoleDefObj);
        SaveFalg=true;
      }else{
        SaveFalg=false;
      }
  
    });
    console.log("secRoleDefList",secRoleDList);
    if(SaveFalg){
      this._RoleDefService.SaveRoleDef(secRoleDList,this.tableData.tableKey).subscribe((res:any)=>{
        console.log("res",res);
        this.toastr.success(this.translateService.instant('DataPermission.DataPermissionAddedSuccessfuly'), 'Success');
      })
    }else{
      this.toastr.warning(this.translateService.instant('DataPermission.youMustFillAllRoleCell'), 'Warnning');
    }
  
  }

  GetRoleDefByTableKey(tableKey:any){
    this.SecRoleDefList=[];
    this.listOfRoleKey=[];
      this._RoleDefService.GetRoleDefByTableKey(tableKey).subscribe((res:Result)=>{
        console.log("resss",res);
        res.model.forEach(element => {
           
          let MapSecRoleDef=new SecRoleDef();
          MapSecRoleDef.id=this.counter;
          MapSecRoleDef.canView=element.canView;
          MapSecRoleDef.canInsert=element.canInsert;
          MapSecRoleDef.canUpdate=element.canUpdate;
          MapSecRoleDef.canDelete=element.canDelete;
          MapSecRoleDef.roleKey=element.roleKey;
          MapSecRoleDef.tableKey=element.tableKey;
          MapSecRoleDef.rolesDataList=this.rolesDataList;
          MapSecRoleDef.ptableKey=element.ptableKey;
          this.SecRoleDefList.push(MapSecRoleDef);
          let selectedRoles = { roleKey: MapSecRoleDef.roleKey, key: MapSecRoleDef.id }
         this.listOfRoleKey.push(selectedRoles);
         this.counter++
        });
        this.spliceSelectedROles();
      })
  }

  //paggination
  next() {
    this.first = this.first + this.rows;
}

prev() {
    this.first = this.first - this.rows;
}

reset() {
    this.first = 0;
}

isLastPage(): boolean {
    return this.tables ? this.first === (this.tables.length - this.rows): true;
}

isFirstPage(): boolean {
    return this.tables ? this.first === 0 : true;
}

ConfirmDelete(){
showModal('deleteDataPermissionModal');
}
}
