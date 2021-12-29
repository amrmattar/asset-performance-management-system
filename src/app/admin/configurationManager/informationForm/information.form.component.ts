

import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { TableData } from '../../../../models/requests/tableDataRequest';
import { Repository } from '../../../data/repository';
import { TablesRepository } from '../../../data/tables.repository';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { SysTable, TableIds } from '../../../../models/responses/systable';
import { FormGroup, FormControl, Validators, AsyncValidatorFn } from '@angular/forms';
import { TableService } from 'src/services/TableService';
import { SharedataService } from '../../securityManager/service/sharedata.service';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
declare var hideModal:any;
declare var showModal:any;
@Component({
  selector: "info-form",
  templateUrl: "./information.form.component.html",
  styleUrls: ['./information.form.component.scss'],
  providers:[TableService]
}) 


export class InformationFormComponent implements OnInit,OnChanges  {
  @Input() childMessage: TableIds;
  submitFlg:boolean=false;
  commonForm: FormGroup;
  captionIsExist: boolean = false;

    ngOnInit(): void {
      this.tableRepo.showNav = false;
      this.commonForm = new FormGroup({
        caption: new FormControl(null, [Validators.required, Validators.minLength(2)]),
        isActive: new FormControl(null),
        isManagedByProduct: new FormControl(null),
        dbtableId: new FormControl(null),
        dbviewId: new FormControl(null),
        uri: new FormControl(null, [Validators.required, Validators.minLength(1)]),
        description: new FormControl(null, [Validators.required, Validators.minLength(1)]),
     
      });    }
  tableRequest: TableData = {};

  constructor(private translateService: TranslateService,private sharedService:SharedataService,
    private userRepo: Repository,
     private tableRepo: TablesRepository,
     private notifications: NotificationsService,
     private _TableService:TableService,
     private toastr: ToastrService) {
    // this.tableRepo.getTables();
    this.table=new SysTable();
    this.childMessage=new TableIds()
  }
  // get table(): SysTable {
  //   return this.tableRepo.table;
  // }
  get entityClicked(): SysTable {
    return this.tableRepo.entityClicked;
  }
  
 
  table:SysTable;

  saveTable() {
    this.tableRequest = {
      
      caption: this.table.caption,
      uri: this.table.uri,
      description: this.table.description,
      isManagedByProduct: this.table.isManagedByProduct,
      isActive: this.table.isActive,
      isWorkflowEnabled: this.table.isWorkflowEnabled,
      isEsclationEnabled: this.table.isEsclationEnabled,
      isSiteFilterEnable: this.table.isSiteFilterEnable,
      dbtableId: this.table.dbtableId,
      dbviewId: this.table.dbviewId,
      tableId: this.table.tableId,
      projectPath: this.table.projectPath,
      orgKey: this.table.orgKey,
      ttype: 1,
      createdBy: this.table.createdBy,
      uid:this.table.uid,
      createdDate:this.table.createdDate,
      jsonTxt:this.table.jsonTxt,
      modifiedBy:this.table.modifiedBy
    };
    if(this.childMessage != undefined){
      this.tableRequest.pTableKey=this.childMessage.ptableKey;
      this.tableRequest.tableKey=this.childMessage.tableKey;
    }
    var infoForm = <HTMLFormElement>document.getElementById('infoForm');
    infoForm.reset();
    this._TableService.createTable(this.tableRequest).
    subscribe(res=>{
      if (res.succeeded === true) {
        var infoForm = <HTMLFormElement>document.getElementById('infoForm');
        //infoForm.reset();
        this.tableRepo.showSidebar = true;
        this.sendMessageFromInfoForm("create",res.data);
        this.toastr.success(this.translateService.instant('infoForm.TableIsSavedSuccessfully'), 'Success');
        
      } else {
        this.toastr.error(res.data, 'error');
        
      }
    })
   
  }
  deleteTable() {
      this._TableService.DeleteTable(this.table.tableKey).subscribe(res=>{
         
        if (res.succeeded === true) {
          hideModal("deleteModal");
          var infoForm = <HTMLFormElement>document.getElementById('infoForm');
          this.tableRepo.showForm = false;
          this.tableRepo.showInfoForm = false;
      this.tableRepo.showNav = false;
          infoForm.reset();
          this.table.isActive=true;
          this.sendMessageFromInfoForm("delete");
          this.toastr.success(this.translateService.instant('infoForm.TableDeletedSuccessfuly'), 'Success');
        } else {
          this.toastr.error(this.translateService.instant('infoForm.TableDeletedFailed'), 'error');
        }
      })
  }
  get showForm(): boolean {
    return this.tableRepo.showForm;
  }
  get showNav(): boolean {
    return this.tableRepo.showNav;
  }

  get tables(): SysTable[] {
    return this.tableRepo.tables;
  }
  checkCaptionExists() {
    this.captionIsExist = false;
    this._TableService.checkTableByCaption(this.commonForm.get('caption').value).
    subscribe(res=>{
       
      if(res.model != null && this.childMessage.tableKey == res.model.tableKey){
        this.captionIsExist=false;
      }else if(res.model != null && this.childMessage.tableKey != res.model.tableKey){
        this.captionIsExist=true;
      }else if(res.model == null){
        this.captionIsExist=false;
      }
    })
    this.table.tableId = this.commonForm.get('caption').value.replace(/[^a-zA-Z0-9]/g, '_');
    this.table.dbtableId = "TB_" + this.table.tableId;
    this.table.dbviewId = "TBV_" + this.table.tableId;
    this.commonForm.get('dbtableId').setValue(this.table.dbtableId);
    this.commonForm.get('dbviewId').setValue(this.table.dbviewId);

  }


 
ngOnChanges() {
    if(this.childMessage != undefined && this.childMessage.tableKey != 0){
      this.GetTableByTableKey(this.childMessage.tableKey);
    }else{
      if(this.commonForm != undefined){
        this.commonForm.controls.isActive.setValue(true);
    
      }
      this.table={isActive :true};
    }
    this.sharedService.sendClickEvent();
} 
GetTableByTableKey(TableKey:any){
  if(TableKey != undefined){
    this._TableService.GetTableByTableKey(TableKey).
    subscribe(res=>{
      this.table=res.model
    })
  }
}

  messageFromInfoForm: any ={type:""};
  @Output() messageEvent = new EventEmitter<any>();


sendMessageFromInfoForm(message:any,systable?:SysTable) {  
   
  if(systable != undefined){
    this.messageFromInfoForm={type:message,tableKey:systable.tableKey,ptableKey:systable.ptableKey};
  }else{
    this.messageFromInfoForm={type:message};
  }

  this.messageEvent.emit(this.messageFromInfoForm);
}

showPop(){
    
  showModal("deleteModal");
}
}
