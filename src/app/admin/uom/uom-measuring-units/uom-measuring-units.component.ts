import { Component, EventEmitter, Input, OnInit, Output ,ViewChild} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { UOMCategoriesRequest } from 'src/models/requests/UomCategoriesRequest';
import { Result } from 'src/models/responses/Result';
import { SysUomeConverstionResponse } from 'src/models/responses/SysUomConverstionResponse';
import { UOMCategoriesResponse } from 'src/models/responses/UomCategoriesResponse';
import { UOMUnitesResponse } from 'src/models/responses/UomUnitesResponse';
import { UOMService } from 'src/services/UOMService';
import { EditService, ToolbarService, PageService, NewRowPosition ,EditSettingsModel,ToolbarItems,IEditCell} from '@syncfusion/ej2-angular-grids';
import { ChangeEventArgs, DropDownListComponent, DropDownList} from '@syncfusion/ej2-angular-dropdowns';
import { Query } from '@syncfusion/ej2-data';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-uom-measuring-units',
  templateUrl: './uom-measuring-units.component.html',
  styleUrls: ['./uom-measuring-units.component.scss']
})
export class UomMeasuringUnitsComponent implements OnInit {
  openLg(content4) {
		this.modalService.open(content4, { size: 'lg' });
	}
  public data: Object[];
  public editSettings: EditSettingsModel;
  public toolbar: ToolbarItems[];
  public setParams : IEditCell;
  public setElem : HTMLElement;
  public setObj : DropDownList;
   public pageSettings: Object;
  public stateElem : HTMLElement;
  public stateObj : DropDownList;
  public unitIdRules: Object;
  public unitCaptionRules: Object;
  public measuringSystemsRules: Object;
  //for Grid 
  @Input() category: any;
  @Output() UnitEvent= new EventEmitter<any>();
  @Output() deleteEvent = new EventEmitter<any>();
  success:any={flag:false};
  categoryRequest:UOMCategoriesResponse={uomeCateg:null,uomeDesc:null,sysUnitsOfMeasure:null}
  converflag:boolean=false;
  newUnitMeasurment:any={uomeCaption:null,uomeId:null,umcsId:null};
  ConverterObject:SysUomeConverstionResponse={fromUomkey:null,toUomkey : null ,converstionFormula:null}
  ListOfNotSelectedConverter:any[];
  AllSets:any[];
  unitCaption:any;
  UomeConverstions:SysUomeConverstionResponse[];
  SelectedUnit:UOMUnitesResponse;
  BaseCategoryName:string;
  disableButton:boolean=true;
  
  constructor(private modalService: NgbModal,private UOMServ:UOMService,private translateService: TranslateService,private toastr: ToastrService ) {
   }

   DeleteConversion(index){
    this.UomeConverstions.splice(index, 1);
    this.disableButton=false;
   }

   DeleteEditConversion(){
    this.ConverterObject={fromUomId:this.unitCaption,toUomkey : null ,converstionFormula:null};
   }
   EnabledSave(){
    this.disableButton=false;
   }
   DisabledSave(){
    this.disableButton=true;

  }
  ngOnInit(): void {
      //for Grid
      this.UOMServ.GetAllUOMSets().subscribe((res)=>{
        if(res.success){
          this.AllSets = res.model;
          this.UOMServ.SetsList = res.model;
          console.log(this.UOMServ.SetsList);
        }
        
      });
      this.unitIdRules = { required: true };
      this.unitCaptionRules = { required: true };
      this.measuringSystemsRules = { required: true };
    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true ,newRowPosition: 'Bottom',mode:'Normal',showDeleteConfirmDialog:true };
    this.toolbar = ['Add', 'Edit', 'Delete', 'Update', 'Cancel'];
      this.setParams = {
          create:()=>{
          this.setElem = document.createElement('input');
              return this.setElem;
          },
          read:()=>{
              return this.setObj.text;
          },
          destroy:()=>{
              this.setObj.destroy();
          },
          write:(args: { rowData: any, column: any }) =>{
              this.setObj = new DropDownList({
              dataSource: this.AllSets,
              fields: { value: 'umcsId', text: 'umcsId' },
              value: (args.rowData as any).umcsId,      // set the value property field while editing CustomerID column 
              change: () => {
              let tempQuery: Query = new Query().where('umcsId', 'equal', this.setObj.value);
          },
          placeholder: 'Select a Measuring System',
          floatLabelType: 'Never'
          });
          this.setObj.appendTo(this.setElem);
      }};
      this.DisabledSave();
      console.log(this.disableButton);
    this.pageSettings = { pageCount: 10 };
  }
  SaveCategory(){
    this.UOMServ.UOMCategoyResponse= this.categoryRequest;
    this.UOMServ.UOMCategoyRequest = this.categoryRequest;
    this.UOMServ.SaveCategory().subscribe(
      (res)=>{       
        if(res.model==false &&res.success==false){
          this.toastr.error(this.translateService.instant('category.UnitListRequired'), 'Error');
        }
        else if(res.model==true &&res.success==true){
          this.success={flag :true};
          this.UnitEvent.emit(this.success);
          this.success={flag :false};
          this.toastr.success(this.translateService.instant('category.AddNewSuccess'), 'Success');
        }
        else{
          this.toastr.error(this.translateService.instant('category.AddNewFailed'), 'Error');
        }
    })
    this.BaseCategoryName='';
    this.DisabledSave();

  }


  DeleteCategory(){
    this.UOMServ.UOMCategoyResponse= this.categoryRequest;
    this.UOMServ.DeleteCategory().subscribe(
      (res)=>{
        this.success={flag :true};
        this.deleteEvent.emit(this.success);
        this.success={flag :false};

       if(res.model==true ){
          this.toastr.success(this.translateService.instant('category.DeleteSuccess'), 'Success');
        }
        else{
          this.toastr.error(this.translateService.instant('category.DeleteFailed'), 'Error');
        }
        this.modalService.dismissAll();
    })
  }
  ngOnChanges() {
    this.DisabledSave();
    if(typeof this.category==="string" && this.category=="AddNew"){
     this.categoryRequest = {uomeCateg:null,uomeDesc:null,sysUnitsOfMeasure:[]};
     this.newUnitMeasurment={index:null ,uomeId:null,uomeCaption:null,umcsId:null}; 
     this.converflag=false;
     this.category='';
    }
    else if( typeof this.category==="string"){
      this.UOMServ.GetAllUnitesForCategory().subscribe(
        (res)=>{
          if(res.success=true){
            if(res.model.sysUomeConverstions){
              this.converflag=true;
            }
            else{
              this.converflag=false;
            }
            this.categoryRequest = res.model;
            this.UOMServ.BaseCategoryName=this.categoryRequest.uomeCateg;
            this.categoryRequest.OldUomeCateg =this.categoryRequest.uomeCateg;
            this.categoryRequest.sysUnitsOfMeasure.forEach(a=>{              
            })
            this.UOMServ.UOMCategoyResponse =this.categoryRequest;
          }
        }
      )
    }
  }
  selected(event){
    this.UomeConverstions= event.data.sysUomeConverstions;
    this.converflag= true;
    this.ConverterObject.fromUomkey=event.data.uomkey   
     this.ConverterObject.toUomId=null;
     this.ConverterObject.converstionFormula=null;
    this.ConverterObject.fromUomId=event.data.uomeId;
    this.unitCaption=event.data.uomeId;
    this.SelectedUnit = event.data;
    if(this.SelectedUnit.sysUomeConverstions==undefined){
      this.SelectedUnit.sysUomeConverstions=[];
    }
    this.GetNotSelectedConverter(event.data);
  }
  PreventConversionsRepete(TOUOMId){
    if( this.SelectedUnit.sysUomeConverstions.find(x=> x.toUomId ==TOUOMId)!=null && this.SelectedUnit.sysUomeConverstions.filter(x=> x.toUomId ==TOUOMId).length>1){
      this.DisabledSave();
              this.toastr.error(this.translateService.instant('set.RepeteConversaionData'), 'Error');
        return;
     }
  }
  AddConvert(){
    if(this.ConverterObject.fromUomId!= null && this.ConverterObject.toUomId != null && this.ConverterObject.converstionFormula!= null)
    {
      this.SelectedUnit= this.categoryRequest.sysUnitsOfMeasure.find(x=> x.uomeId == this.ConverterObject.fromUomId );
      if( this.SelectedUnit.sysUomeConverstions.find(x=> x.toUomId ==this.ConverterObject.toUomId)!=null){
                this.toastr.error(this.translateService.instant('set.RepeteConversaionData'), 'Error');
          return;
       }
       this.UomeConverstions.push(this.ConverterObject)
     this.ConverterObject={fromUomId:this.unitCaption,toUomId:null,fromUomkey:  this.SelectedUnit.uomkey,toUomkey:null,converstionFormula:null};
     this.EnabledSave();
    }
  }
  GetNotSelectedConverter(it){
    this.ListOfNotSelectedConverter =  this.categoryRequest.sysUnitsOfMeasure.filter(x=>x.uomeId != it.uomeId);
  }
 
  
  SaveUnit(event){
    if( event.requestType == 'save'){
      this.EnabledSave();
      if(event.action == 'add'){
        this.SelectedUnit = event.data;
        this.SelectedUnit.uomkey =0;
        this.SelectedUnit.sysUomeConverstions=[];
        this.UomeConverstions=[];
        this.UomeConverstions.forEach(a=>{
          this.SelectedUnit.sysUomeConverstions.push(a);
        })
        if(this.SelectedUnit.sysUomeConverstions==undefined){
          this.SelectedUnit.sysUomeConverstions=[];
        }
      var IsPresent = this.categoryRequest.sysUnitsOfMeasure.filter(a=>a.uomeId==this.SelectedUnit.uomeId )
    if (IsPresent != null && IsPresent.length!=0) 
    { 
      event.cancel = true;   
        this.toastr.error(this.translateService.instant('set.RepeteData'), 'Error');
        event.rows.shift();
        event.data.shift();
        this.DisabledSave();
        return;
    }
      }
      else if(event.action == 'edit'){
        this.categoryRequest.sysUnitsOfMeasure.find(a=>a.uomeId==this.SelectedUnit.uomeId ).uomeId = event.data.uomeId;
        this.UomeConverstions.forEach(a=>{    
          a.fromUomId =event.data.uomeId ;
        })
        this.SelectedUnit.uomeCaption = event.data.uomeCaption;
        this.SelectedUnit.uomeId = event.data.uomeId;
        this.SelectedUnit.umcsId = event.data.umcsId;
     
      
        this.categoryRequest.sysUnitsOfMeasure.forEach(a=>{   
          a.sysUomeConverstions.forEach(b=>{ 
            if(b.toUomId==event.previousData.uomeId)   
             b.toUomId =event.data.uomeId ;
           })   
         })
       
        var IsPresent = this.categoryRequest.sysUnitsOfMeasure.filter(a=>a.uomeId==this.SelectedUnit.uomeId )
    if (IsPresent != null && IsPresent.length>1) 
    { 
      event.cancel = true;   
        this.toastr.error(this.translateService.instant('set.RepeteData'), 'Error');
        event.rows.shift();
        event.data.shift();
        return;
    }
        this.EnabledSave();
      }
    
    }
    else if( event.requestType == 'delete')
    {
      this.categoryRequest.sysUnitsOfMeasure.forEach(a=>{   
        a.sysUomeConverstions = a.sysUomeConverstions.filter(b=> b.toUomId != event.data[0].uomeId )
      })
      this.UomeConverstions=[];
      this.ConverterObject={};
      this.converflag =false;
      this.EnabledSave();

    }
}
}
