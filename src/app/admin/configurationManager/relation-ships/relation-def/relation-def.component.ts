import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { RelationDataRequest } from 'src/app/models/requests/RelationDataRequest';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { TableIds } from 'src/models/responses/systable';
import { RelationshipService } from 'src/services/RelationshipService';
import { TableService } from 'src/services/TableService';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
declare var hideModal:any;
@Component({
  selector: 'app-def',
  templateUrl: './relation-def.component.html',
  styleUrls: ['./relation-def.component.scss'],
  providers:[TableService]
})
export class RelationDefComponent implements OnInit,OnChanges {
  
  @Input() relationTableId: TableIds;
  @Input() RelationShipDefRecord:any;
  RelationDataForm: FormGroup;
  sysTables : any;
  tablesDataList:any;
  relationRequest : RelationDataRequest;
  predKey :any ;
  succKey : any;
  relationshipType:any;
  constructor(private translateService: TranslateService,private _RelationshipService:RelationshipService,
              private _TableService : TableService,
              private fb: FormBuilder,
              private toastr: ToastrService) 
              {
                this.relationTableId = new TableIds();
                this.relationRequest=new RelationDataRequest();
              }

ngOnInit(): void {
    
  this.getAllTables("");
  this.RelationDataForm = this.fb.group({
    defKey:[0],
    predTkey: [null,Validators.required],
    succTkey: [null,Validators.required],
    relationType: [0,Validators.required],
    tableKey:[0],
    applyPreSubFamily: [false],
    applySucSubFamily: [false]
  });
  
}
get f() { return this.RelationDataForm.controls; }

  ngOnChanges() {
     
   
    if(this.RelationShipDefRecord != undefined){
      if(this.RelationShipDefRecord.ckey > 0){
        this.GetRelationById(this.RelationShipDefRecord.ckey);
      }else{
        this.RelationDataForm.reset();
      }
      
    }

  }
 
  get relationDefForm(){
    return this._RelationshipService.showDefForm;
  }

  get relationsDef(){
    return this._RelationshipService.showDefRelation;
  }

  showRelationDefForm(){
     
    this._RelationshipService.showDefGrid = true;
    this._RelationshipService.showDefForm = true;
    this._RelationshipService.showDefRelation = false;

  }

  getAllTables(search:string){
    this._TableService.GetTablesWithTypeOne(search).subscribe(res=>{
      // 
      this.sysTables = res;
      this.tablesDataList = this.sysTables.tablesDataList;
    })
  }

  onSubmit() {
    if(this.RelationDataForm.get('defKey').value > 0){
      //update
      this._RelationshipService.UpdateelationshipDef(this.RelationDataForm.value).subscribe(res=>{
        if(res.result.success){
          this.toastr.success(this.translateService.instant('Relation-def.RecordUpdatedSuccessfuly'), 'Success');
          this.BackRelationtable();
        }
      })
    }else{
      //add new
      this.RelationDataForm.patchValue({tableKey: this.relationTableId.tableKey});
      this._RelationshipService.saveRelationshipDef(this.RelationDataForm.value).subscribe(res=>{
        if(res.success){
          this.toastr.success(this.translateService.instant('Relation-def.RecordAddedSuccessfuly'), 'Success');
          this.BackRelationtable();
        }
      })
    }
  }

  goBack(){
    this.BackRelationtable();
  }
  
  BackRelationtable(){
    this._RelationshipService.showRelationshipForm = false;
    this._RelationshipService.showDefGrid = true;
    this._RelationshipService.showDefRelation = true;
    this._RelationshipService.showDefForm = false;
  }
  defKey

  GetRelationById(defKey:any){
    this._RelationshipService.GetRelationById(defKey).subscribe((res:any)=>{
        this.relationRequest=res.model;
        this.RelationDataForm.patchValue({
          defKey:this.relationRequest.defKey,
          predTkey:  this.relationRequest.predTkey,
          succTkey:this.relationRequest.succTkey,
          tableKey:this.relationRequest.tableKey,
          applyPreSubFamily:this.relationRequest.applyPreSubFamily,
          applySucSubFamily:this.relationRequest.applySucSubFamily,
          relationType:this.relationRequest.relationType
        })
    });
  }

  deleteRelationDef(){
    let defKey=this.RelationDataForm.get('defKey').value;
    this._RelationshipService.deleteRelationDef(defKey).subscribe((res:any)=>{
      if(res.success){
        hideModal("deleteRelationDefModal");
        this.toastr.success(this.translateService.instant('Relation-def.RecordDeletedSuccessfuly'), 'Success');
          this.BackRelationtable();
      }
    })
  }
  
}
