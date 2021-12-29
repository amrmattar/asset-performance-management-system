import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { ToastrService } from 'ngx-toastr';
import { Repository } from 'src/app/data/repository';
import { TablesRepository } from 'src/app/data/tables.repository';
import { TableData } from 'src/models/requests/tableDataRequest';
import { SysTable, TableIds } from 'src/models/responses/systable';
import { RelationshipService } from 'src/services/RelationshipService';
import { TableService } from 'src/services/TableService';
declare var hideModal:any;
declare var showModal:any;
@Component({
  selector: 'app-relation-info',
  templateUrl: './relation-info.component.html',
  styleUrls: ['./relation-info.component.scss'],
  providers:[TableService]
})
export class RelationInfoComponent implements OnInit {
  @Input()  messageFromRelationships: TableIds;
  @Output() messageEventFromRelationInfo = new EventEmitter<any>();
  submitFlg:boolean=false;
  commonForm: FormGroup;
  captionIsExist: boolean = false;

    ngOnInit(): void {
      this.commonForm = new FormGroup({
        caption: new FormControl(null, [Validators.required, Validators.minLength(2)]),
        isActive: new FormControl(null),
        isManagedByProduct: new FormControl(null),
        // dbtableId: new FormControl(null),
        dbviewId: new FormControl(null),
        // uri: new FormControl(null, [Validators.required, Validators.minLength(1)]),
        description: new FormControl(null, [Validators.required, Validators.minLength(1)]),
     
      });    }
  tableRequest: TableData = {};

  constructor(private translateService: TranslateService,private userRepo : Repository,
     private tableRepo: TablesRepository,
     private notifications: NotificationsService,
     private _TableService:TableService,
     private _RelationshipService:RelationshipService,
     private toastr: ToastrService) {
    // this.tableRepo.getTables();
    this.table = new SysTable();
    this. messageFromRelationships=new TableIds();
  }
  
  get entityClicked(): SysTable {
    return this.tableRepo.entityClicked;
  }
  
 
  table:SysTable;
  saveTableRelationship() {
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
    if(this. messageFromRelationships != undefined){
      this.tableRequest.pTableKey=this. messageFromRelationships.ptableKey;
      this.tableRequest.tableKey=this. messageFromRelationships.tableKey;
    }
    var infoForm = <HTMLFormElement>document.getElementById('infoForm');
    infoForm.reset();
    
    this._RelationshipService.createRelationshipTable(this.tableRequest).subscribe(res=>{
        
      if (res.success) {
        var infoForm = <HTMLFormElement>document.getElementById('infoForm');
        infoForm.reset();
        this.table.isActive=true;
        this.tableRepo.showSidebar = true;
        //this.sendMessageFromInfoForm("create");
        this.sendMessageFromRelationForm("create",res.model.data);
        this.toastr.success(this.translateService.instant('Relation-info.TableIsSavedSuccessfully'), 'Success');
      } else {
        this.toastr.error(this.translateService.instant('Relation-info.TableIsSavedFailed'), 'Error');
      }
    })
   
  }
  deleteTable() {
      // this.repo.editsOn === false;
      this._RelationshipService.deleteRelationshipTable(this.table.tableKey).subscribe(res=>{
         
        if (res.succeeded === true) {
          hideModal("exampleModal");
          this.table.caption=null;
          this.table.tableId=null;
          this.table.dbviewId=null;
          this.table.description=null;
          this.table.uri=null;
          this.table.dbtableId=null;
          this.messageFromRelationships.tableKey=0;
          this.messageFromRelationships.ptableKey=0;
          this.sendMessageFromRelationForm("delete");
          this.toastr.success(this.translateService.instant('Relation-info.tableDeletedSuccessfuly'), 'Success');
        } else {
           this.toastr.error(this.translateService.instant('Relation-info.tableDeletedFaild'), 'Error');
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
       
      if(res.model != null && this. messageFromRelationships.tableKey == res.model.tableKey){
        this.captionIsExist=false;
      }else if(res.model != null && this. messageFromRelationships.tableKey != res.model.tableKey){
        this.captionIsExist=true;
      }else if(res.model == null){
        this.captionIsExist=false;
      }
    })
    this.table.tableId = this.commonForm.get('caption').value.replace(/[^a-zA-Z0-9]/g, '_');
    this.table.dbtableId = "TB_" + this.table.tableId;
    this.table.dbviewId = "TBV_" + this.table.tableId;
    this.commonForm.get('dbviewId').setValue(this.table.dbviewId);

  }


 
ngOnChanges() {
    if(this. messageFromRelationships != undefined && this. messageFromRelationships.tableKey != 0){
      this.GetTableByTableKey(this. messageFromRelationships.tableKey);
    }else{
      if(this.commonForm != undefined){
        this.commonForm.controls.isActive.setValue(true);
    
      }
      this.table={isActive :true};
    }
   
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


sendMessageFromInfoForm(message:any) {  
   
  this.messageFromInfoForm={type:message};
  this.messageEvent.emit(this.messageFromInfoForm);
}


sendMessageFromRelationForm(message:any,systable?:any) {  
   
  if(systable != undefined){
    this.messageFromInfoForm={type:message,tableKey:systable.tableKey,ptableKey:systable.ptableKey};
  }else{
    this.messageFromInfoForm={type:message};
  }
  
  this.messageEventFromRelationInfo.emit(this.messageFromInfoForm);
}
showPop(){
  showModal("exampleModal");
}
}

