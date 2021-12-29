import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { TablesRepository } from '../../../data/tables.repository';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ColumnData, DataTypeEnum, DataTypeMapping } from '../../../../models/requests/columnDataRequest';
import { Repository } from '../../../data/repository';
import { UomcSetsData } from '../../../../models/responses/uomcSetsDataResponse';
import { NotificationType, NotificationsService } from 'angular2-notifications';
import { SysTable, TableIds } from '../../../../models/responses/systable';
import { TableService } from 'src/services/TableService';
import { ColumnRequest } from 'src/models/requests/ColumnRequest';
import { SortEvent } from 'primeng/api';
import { ToastrService } from 'ngx-toastr';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { NgbModal, ModalDismissReasons, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';


declare var hideModal:any;
declare var showModal:any;
@Component({
  selector: "fields-info-form",
  templateUrl: "./fields.info.component.html",
  styleUrls: ['./fields.info.component.scss'],
  providers:[TableService]
})
export class FieldsInfoFormComponent implements OnInit,OnChanges {

  public config: PerfectScrollbarConfigInterface = {};
  @Input() FieldMessage: TableIds;
  flagBack: boolean = false;
  @Output() FlagEvent = new EventEmitter<boolean>();
   columnRequest:ColumnData;
  columnForm: FormGroup;
  captionIsExist: boolean = false;
  dataTypes;
  showUomDDL: boolean = false;
  showSizeInput: boolean = false;
  // showBehavior: boolean = false;
  table:SysTable;
  Required:any;
  @Input() childRecord: any;
  MaskedFiedChecked:boolean=false;
  maskedFieldValue:any="";
  BeforSavemaskedFieldValue:any;
  Validation:any;
  DefaultValue:any;
  LitteralValueDemo:any;
  LitteralValue:any;
  DisabledValue:any;
  FormateValue:any="\$\ ?[+-]?[0-9]{1,3}(?:,?[0-9])*(?:\.[0-9]{1,2})?" ;
  FixedDigitAfterDecimalPointDemo:any;
  FixedDigitAfterDecimalPoint:any="^\d*(\.\d{1,2})?$";
  FixedDigitBeforeDecimalPointDemo:any;
  FixedDigitBeforeDecimalPoint:any="^\d*(\.\d*)?$";
  FixedDFlag:boolean=false;
  flagFixedBeforeDigit:boolean=false;
  customeFormateRgex:boolean=false;
  CustomeFormat:any;
  showList:boolean=false;
  ValidValue:any;
  ItemStaticList:any;
  ListOfStaitcList:any=[];
  HideFalid:any;
  flagShowValidation:boolean=false;
  validationValues:any;
  
  showStaticFlag:boolean=false;
  Scientific:any="-?[\d.]+(?:e-?\d+)?";
  General:any="^([a-zA-Z]+\s)*[a-zA-Z]+$";
  numericRegex:any="^\d+$";
  HexaDecimal:any="^[-+]?[0-9A-Fa-f]+\.?[0-9A-Fa-f]*?$";
  PercentRegex:any="^(100(\.0{1,2})?|[1-9]?\d(\.\d{1,2})?)$";
  currency:any="\$\ ?[+-]?[0-9]{1,3}(?:,?[0-9])*(?:\.[0-9]{1,2})?')";
  flagShowBetweenDrop:boolean=false;
  showStaticValue1:boolean=false;
  showStaticValue2:boolean=false;
  showDynamicColumn1:boolean=false;
  showDynamicColumn2:boolean=false;
  StaticValueEnterd:any;
  StaticValueEnterd1:any;
  StaticValueEnterd2:any;
  josonBehavior:any;
  selectedBetewenType:any;
  validValueSelectedColumn:any;
  validValueSelectedColumn1:any;
  validValueSelectedColumn2:any;
  columnsList:any=[];
  columnsListDemo:any[];
  disableValidation:boolean=false;
  CategoryList:any=[];
  UOMCOfCategoryList:any=[];
  customeFormateList=[
    {key:"^\\S+@\\S+$",value:"Email"},
    {key:"^\\d{11}$",value:"Phone"},
    {key:"^\\+?[0-9]{7,}$",value:"Fax"}
  ]
  closeResult: string;
  constructor(private translateService: TranslateService,private modalService: NgbModal,private userRepo: Repository, private tableRepo: TablesRepository,
     private notifications: NotificationsService,private _TableService:TableService,
     private toastr: ToastrService) {
      this.FieldMessage=new TableIds();
    this.dataTypes = DataTypeMapping;
    this.userRepo.getUsers();
    this.table=new SysTable();
     this.columnRequest=new ColumnData();
     this.columnRequest={isActive:true};
    this.ListOfStaitcList=new Array;
    this.columnsList=new Array;
    this.columnsListDemo=new Array;
    this.CategoryList=new Array;
    this.UOMCOfCategoryList=new Array;
  }
  ngOnInit(): void {
  } 
  get uomcs(): UomcSetsData[] {
    return this.userRepo.uomcs;
  }
  get columns(): ColumnData[] {
    return this.tableRepo.columns;
  }
  // get columnRequest(): ColumnData {
  //   return this.tableRepo.columnRequest;
  // }
 
  setShowInfoForm(val:boolean) {
   
    this.tableRepo.showInfoForm = val;
    if(val == false){
      this.columnRequest={isActive:true};
      this.sendMessage();
    }
  }
  setShowBehavior(val: boolean) {
     
    this.tableRepo.showBehavior = val;
  }
  get showBehavior(){
   return this.tableRepo.showBehavior;
  }
 
  get showInfoForm(): boolean {
    return this.tableRepo.showInfoForm;
  }
  showInputs(val) {
   
    this.showSizeInput = false;
    this.showUomDDL = false;
    this.columnRequest.size=null;
    if (val == 4) {
     this.columnRequest.size=50;
      this.showSizeInput = true;
      this.showUomDDL = false;
    } else if (val == 2) {
      this.showUomDDL = true;
      this.showSizeInput = false;
    } 
    let obj:ColumnRequest={tkey:this.FieldMessage.tableKey,search:null};
    this.GetColumnNew(obj);
    
  }

  showInputsUpdate(val,size) { 
    this.showSizeInput = false;
    this.showUomDDL = false;
    this.columnRequest.size=null;
    if (val == 4) {
     this.columnRequest.size=size;
      this.showSizeInput = true;
      this.showUomDDL = false;
    } else if (val == 2) {
      this.showUomDDL = true;
      this.showSizeInput = false;
    } 
    let obj:ColumnRequest={tkey:this.FieldMessage.tableKey,search:null};
    this.GetColumnNew(obj);
    
  }
  deleteColumn() {
   
     this._TableService.DeleteColumn(this.columnRequest.ckey).subscribe(res=>{
        if (res.succeeded === true) {
          hideModal("deleteColumnModal");
        this.columnRequest={isActive:true};
        this.setShowInfoForm(false);
   
        this.toastr.success(this.translateService.instant('infoField.ColumnDeletedSuccessfly'), 'Success');
      } else{
        this.toastr.error(this.translateService.instant('infoField.ColumnDeletedFaild'), 'Error');
      }
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
  saveColumn() {
   
    this.setBehavior();
    if (this.captionIsExist) {
      this.columnForm.setErrors({ ...this.columnForm.errors, 'captionExist': true });
      return;
    }
    this.columnRequest.size = this.columnRequest.size != null ?  this.columnRequest.size : null ;
    this.columnRequest.tkey = this.table.tableKey;
    this.columnRequest.jsonBehavior=JSON.stringify(this.josonBehavior);
    this._TableService.SaveColumn(this.columnRequest).subscribe(res=>{
debugger
      this.columnRequest={isActive:true};
      if (res.message === "success") {
        this.toastr.success(this.translateService.instant('infoField.ColumnAddedSuccessfly'), 'Success');
        this.tableRepo.showSidebar = true;
        this.setShowInfoForm(false);
        this.setShowBehavior(false);
        this.setIntialBehaviorValues();
  
      } else if(res.message === "error"){
         this.toastr.error(this.translateService.instant('infoField.ColumnAddedFaild'), 'Error');
      }
    })
  }
  checkCaptionExists() {
    this.captionIsExist = false;
    this._TableService.checkCaptionExists(this.columnRequest.columnCaption,this.FieldMessage.tableKey).
    subscribe(res=>{
     
      if(res.model != null ){
        this.captionIsExist=true;
        
      }
    })
    this.columnRequest.columnId = "TF_" +this.columnRequest.columnCaption.replace(/[^a-zA-Z0-9]/g, '_');

   }


  GetColumn(columnRequest:any){
    this._TableService.GetAllColumns(columnRequest).subscribe(res=>{
     this.columnsListDemo= res.data.columnsDataList;
     if(this.childRecord != undefined){
      this.GetColumnByCKey(this.childRecord.ckey);
    }
    })
  }
  GetColumnNew(columnRequest:any){
    this._TableService.GetAllColumns(columnRequest).subscribe(res=>{
     this.columnsListDemo= res.data.columnsDataList;
     this.columnsListDemo=this.columnsListDemo.filter(x=>x.columnDataType == this.columnRequest.columnDataType && x.ckey != this.columnRequest.ckey);
    })
  }

  ngOnChanges() {

  
    this.setIntialBehaviorValues();

    if(this.childRecord != undefined){
      
    }  
    if(this.FieldMessage != undefined){
      let obj:ColumnRequest={tkey:this.FieldMessage.tableKey,search:null};
      this.GetColumn(obj);
      
      if(this.FieldMessage != undefined && this.FieldMessage.tableKey != 0){
        this.GetTableByTableKey(this.FieldMessage.tableKey);
    }

    }else{
      this.table={tableKey :0};
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
  sendMessage() {
   
    this.flagBack=!this.flagBack;
    this.FlagEvent.emit(this.flagBack)
  }
//GetColumnByCKey
GetColumnByCKey(ckey:any){
  this._TableService.GetColumnByCKey(ckey).subscribe(res=>{
    debugger;
      this.columnRequest=res.model;
      //dataTypes
      let obj = JSON.parse(this.columnRequest.jsonBehavior);
      this.columnsListDemo=this.columnsListDemo.filter(x=>x.columnDataType == this.columnRequest.columnDataType && x.ckey != this.columnRequest.ckey);
      let type=  this.dataTypes.find(x=>x.type ==this.columnRequest.columnDataType ).value;
      if(this.columnRequest.columnDataType =="Character"){
        this.disableValidation=true;
      }else{
        this.disableValidation=false;
      }
      this.showInputsUpdate(type,this.columnRequest.size);
      this.GetBehaviorOnLoad(obj)
  },
  error => {
   // this.errors = error;
  },
  () => {
    // No errors, route to new page
  });
}

setBehavior(){
 // 
let demo;
 let typeOfValidValue;
  if(this.ListOfStaitcList.length > 0){
    this.ValidValue=this.ListOfStaitcList;
    typeOfValidValue="StaticList";
  }else if(this.ValidValue == "APMDefault"){
    typeOfValidValue="APMDefault";
  }
  let typeOfRegex="APMDefault";
  if(this.FormateValue == this.FixedDigitBeforeDecimalPoint){
    typeOfRegex="Fixed Digit Before DecimalPoint";
    demo=this.FixedDigitBeforeDecimalPointDemo;
    this.FormateValue=this.FixedDigitBeforeDecimalPoint;
  }
  if(this.FormateValue == this.FixedDigitAfterDecimalPoint){
    typeOfRegex="Fixed Digit After DecimalPoint";
    demo=this.FixedDigitAfterDecimalPointDemo;
    this.FormateValue=this.FixedDigitAfterDecimalPoint;
  }
  if(this.FormateValue == this.Scientific){
    typeOfRegex="Scientific";
    this.FormateValue=this.Scientific;
  }
  //numericRegex
  if(this.FormateValue == this.numericRegex){
    typeOfRegex="Number";
    this.FormateValue=this.numericRegex;
  }

  if(this.FormateValue == this.HexaDecimal){
    typeOfRegex="HexaDecimal";
    this.FormateValue=this.HexaDecimal;
  }
  if(this.FormateValue == this.CustomeFormat){
    typeOfRegex="Custome";
    this.FormateValue=this.CustomeFormat;
   
  }
  if(this.FormateValue == this.PercentRegex){
    typeOfRegex="Percent";
    this.FormateValue=this.PercentRegex;
  }
  if(this.FormateValue == this.General){
    typeOfRegex="General";
    this.FormateValue=this.General;
  }
  if(this.FormateValue == this.currency){
    typeOfRegex="currency";
    this.FormateValue=this.currency;
  }
  this.josonBehavior={
    "behavior":[ 
      {
        "key":"Required",
        "value":this.Required
      },
      {
        "key":"maskedField",
        "value":this.maskedFieldValue
      },
      {
        "key":"validation",
        "value":this.Validation,//< > = 
        "type":this.selectedBetewenType=="staticValue"?"staticValue":"NumericColumn",//static of numeric
        "validValueStaticOrColumn":this.selectedBetewenType=="staticValue"?this.StaticValueEnterd:this.selectedBetewenType,
        "validValueStaticOrColumn1":this.selectedBetewenType=="staticValue"?this.StaticValueEnterd1:this.validValueSelectedColumn1,
        "validValueStaticOrColumn2":this.selectedBetewenType=="staticValue"?this.StaticValueEnterd2:this.validValueSelectedColumn2
      },
      {
        "key":"DefaultValue",
        "value":this.DefaultValue
      },
      {
        "key":"DisabledValue",
        "value":this.DisabledValue
      },
      {
        "key":"FormateValue",
        "value":this.FormateValue,
        "type":typeOfRegex,
        "Demo":demo
      },
      {
        "key":"ValidValue",
        "value":this.ValidValue,
        "typeOfValidValue":typeOfValidValue
      },
      {
        "key":"HideFalid",
        "value":this.HideFalid
      }
    ]
    }
 
}
SaveLitteralValue(){
  this.DefaultValue=this.LitteralValue;
}

handleValidationChange(evt) {
 // 
  this.flagShowBetweenDrop = false;
  this.showStaticValue1=false;
  this.showStaticValue2=false;
  this.StaticValueEnterd=undefined;
  this.showStaticFlag = false;
  this.StaticValueEnterd1=undefined;
  this.StaticValueEnterd2=undefined;
  this.validValueSelectedColumn1=undefined;
  this.validValueSelectedColumn2=undefined;

  var target = evt.target;
  if(this.Validation == "APMDefault"){
    this.flagShowValidation = false;
    this.showStaticFlag=false;
    this.validValueSelectedColumn=undefined;
  }else{
    this.validValueSelectedColumn=undefined;
    this.flagShowValidation = true;
  }
}
//handleLitteralValueChange
litteralValueFlag:boolean=false;
handleLitteralValueChange(evt) {
  var target = evt.target;
  this.litteralValueFlag=target.checked;
 }


handleAPMDefaultChange(evt) {
 
  var target = evt.target;
  if (target.checked) {
    this.LitteralValue=null;
    this.litteralValueFlag=false;
  }
}

SelectColumnValue(){
// 
  if(this.selectedBetewenType =="staticValue"){
    //show static
    this.showStaticFlag=true;
  }else{
    //select from column
    this.showStaticFlag=false;
  }
}



HandleFixedDigitAfterDecimalPoint(evt){
 
  var target = evt.target;
  if (target.checked) {
    this.FixedDFlag=true;
    this.flagFixedBeforeDigit=false;
    this.customeFormateRgex=false;
    this.CustomeFormat=null;
    this.FixedDigitBeforeDecimalPointDemo=null;
  }
}

//HandleFixedDigitBeforeDecimalPoint
HandleFixedDigitBeforeDecimalPoint(evt){
 
  var target = evt.target;
  if (target.checked) {
   this.flagFixedBeforeDigit=true;
   this.FixedDFlag=false;
   this.customeFormateRgex=false;
   this.CustomeFormat=null;
   this.FixedDigitAfterDecimalPointDemo=null;
  }
}


SaveFixedDigitAfterDecimalPoint(){
  this.FixedDigitAfterDecimalPointDemo;
  this.FixedDigitAfterDecimalPoint="^\\d*(\\.\\d{1,"+this.FixedDigitAfterDecimalPointDemo+"})?$";
  this.FormateValue=this.FixedDigitAfterDecimalPoint;
}

SaveFixedDigitBeforeDecimalPoint(){
  this.FixedDigitBeforeDecimalPointDemo;
  this.FixedDigitBeforeDecimalPoint="^\\d{0,"+this.FixedDigitBeforeDecimalPointDemo+"}(\\.\\d*)?$";
  this.FormateValue=this.FixedDigitBeforeDecimalPoint;
}
SavecustomeFormateRgex(){
  this.FormateValue=null;
    this.FormateValue=this.CustomeFormat;
}


resetFlage(){
  this.FixedDFlag=false;
  this.flagFixedBeforeDigit=false;
  this.FixedDigitAfterDecimalPointDemo=null;
  this.FixedDigitBeforeDecimalPoint=null;
  this.customeFormateRgex=null;
  this.customeFormateRgex=false;
}
setScientific(value){
  this.Scientific = value;
  this.FormateValue=this.Scientific;
}
SetNumericRegex(value){
  this.numericRegex = value;
  this.FormateValue=this.numericRegex;
}
setHexaDecimal(value){
  this.HexaDecimal = value;
  this.FormateValue=this.HexaDecimal;
}
setPercent(value){
 // 
  this.PercentRegex=value;
  this.FormateValue=this.PercentRegex;
}
setGeneral(value){
  this.General=value;
  this.FormateValue=this.General;
}
setCurrency(value){
  this.currency = value;
  this.FormateValue=this.currency;
}
HandleCustomeFormat(evt){

   this.customeFormateRgex=true;
   this.FixedDFlag=false;
  this.flagFixedBeforeDigit=false;
  this.CustomeFormat=null;
  this.FormateValue=this.CustomeFormat;
}
AddOnStaticList(){
  let obj={"value":this.ItemStaticList}
  this.ListOfStaitcList.push(obj);
  this.ItemStaticList=null;
}
resetFlagOfValidValue(){
  this.showList=false;
  this.ListOfStaitcList=new Array;
}
showStaticList(){
  this.showList=true;
}
deleteItemFromStaticList(rowIndex){
 if (rowIndex > -1) {
  this.ListOfStaitcList.splice(rowIndex, 1);
}
}
customSort(event: SortEvent) {
 
  event.data.sort((data1, data2) => {
      let value1 = data1[event.field];
      let value2 = data2[event.field];
      let result = null;

      if (value1 == null && value2 != null)
          result = -1;
      else if (value1 != null && value2 == null)
          result = 1;
      else if (value1 == null && value2 == null)
          result = 0;
      else if (typeof value1 === 'string' && typeof value2 === 'string')
          result = value1.localeCompare(value2);
      else
          result = (value1 < value2) ? -1 : (value1 > value2) ? 1 : 0;

      return (event.order * result);
  });
}


GetBehaviorOnLoad(obj:any){
 
  this.ListOfStaitcList=new Array;
  this.showList=false;
  this.showStaticValue1=false;
  this.showStaticValue2=false;
  this.showDynamicColumn1=false;
  this.showDynamicColumn2=false;
  this.selectedBetewenType=null;
  this.columnsList=this.columnsListDemo
  if(obj != null){
 
    obj.behavior.forEach(element => {
     // 
      if(element.key =="Required"){
        this.Required=element.value;
      }
      if(element.key == "maskedField"){
        this.maskedFieldValue=element.value;
        if(element.value != ""){
          this.MaskedFiedChecked=true;
        }
        
      }
      if(element.key == "validation"){
        
        this.Validation=element.value;
        //this.flagShowValidation=false;
        if(element.type != null){
          if(element.type == "staticValue"){
            if(element.value =='BetweenExclusive'){
              this.selectedBetewenType="staticValue";
              this.showStaticValue1=true;
              this.showStaticValue2=true;
              this.flagShowBetweenDrop=true;
              this.StaticValueEnterd1=element.validValueStaticOrColumn1;
              this.StaticValueEnterd2=element.validValueStaticOrColumn2;
            }else if(element.value =='BetweenInclusive'){
              this.selectedBetewenType="staticValue";
              this.showStaticValue1=true;
              this.showStaticValue2=true;
              this.showDynamicColumn1=false;
              this.showDynamicColumn2=false;
              this.flagShowBetweenDrop=true;
              this.StaticValueEnterd1=element.validValueStaticOrColumn1;
              this.StaticValueEnterd2=element.validValueStaticOrColumn2;
            }else{
              this.flagShowBetweenDrop=false;
              this.flagShowValidation=true;
              this.showStaticFlag=true;
              this.StaticValueEnterd=element.validValueStaticOrColumn;
              this.selectedBetewenType="staticValue";
             
            }
          }
          if(element.type == "NumericColumn")
          {
            if(element.value =='BetweenExclusive'){
              this.selectedBetewenType="NumericColumn";
              this.showStaticValue1=false;
              this.showStaticValue2=false;
              this.showDynamicColumn1=true;
              this.showDynamicColumn2=true;
              this.flagShowBetweenDrop=true;
              this.validValueSelectedColumn1=element.validValueStaticOrColumn1;
              this.validValueSelectedColumn2=element.validValueStaticOrColumn2;
            }else if(element.value =='BetweenInclusive'){
              this.selectedBetewenType="NumericColumn";
              this.showStaticValue1=false;
              this.showStaticValue2=false;
              this.showDynamicColumn1=true;
              this.showDynamicColumn2=true;
              this.flagShowBetweenDrop=true;
              this.validValueSelectedColumn1=element.validValueStaticOrColumn1;
              this.validValueSelectedColumn2=element.validValueStaticOrColumn2;
            }else{
              this.flagShowBetweenDrop=false;
             this.flagShowValidation=true;
              this.showStaticFlag=false;
             
              this.selectedBetewenType=element.validValueStaticOrColumn;
            }
    
          }
          if(element.value=="APMDefault"){
            this.flagShowValidation=false;
          }
        }  
        }
        if(element.key=="DefaultValue"){
          if(element.value =="APMDefault"){
            this.DefaultValue=element.value;
          }else{
            this.DefaultValue=element.value;
            this.LitteralValue=element.value;
            this.litteralValueFlag=true;
          }
        }
        if(element.key=="DefaultValue"){
          if(element.value =="APMDefault"){
            this.DefaultValue=element.value;
          }else{
            this.DefaultValue=element.value;
            this.LitteralValue=element.value;
            this.litteralValueFlag=true;
          }
        }
        if(element.key=="DisabledValue"){
            this.DisabledValue=element.value;
        }
        if(element.key=="FormateValue"){
          
          this.FixedDFlag=false;
          this.flagFixedBeforeDigit=false;
          this.FixedDigitAfterDecimalPointDemo=null;
          this.FixedDigitBeforeDecimalPointDemo=null;
          this.customeFormateRgex=false;
          this.CustomeFormat=null;
         
          if(element.type == "Fixed Digit After DecimalPoint"){
            this.FixedDigitAfterDecimalPointDemo=element.Demo;
            this.FixedDFlag=true;
            this.FixedDigitAfterDecimalPoint=element.value;
          }
          if(element.type == "Fixed Digit Before DecimalPoint"){
            this.FixedDigitBeforeDecimalPointDemo=element.Demo;
            this.flagFixedBeforeDigit=true;
            this.FixedDigitBeforeDecimalPoint=element.value;
          }
          if(element.type == "Custome"){
            this.CustomeFormat=element.value;
            this.customeFormateRgex=true;
          }
          if(element.type == "currency"){
            this.currency=element.value;
          }
          if(element.type == "Number"){
            this.numericRegex=element.value;
          }
          if(element.type == "Scientific"){
            this.Scientific=element.value;
          }
          if(element.type == "General"){
            this.General=element.value;
          }
          this.FormateValue=element.value;

        }
        if(element.key=="ValidValue"){
          
          if(element.typeOfValidValue == "APMDefault"){
            this.ValidValue="APMDefault";
            
          }
          if(element.typeOfValidValue == "StaticList"){
             this.ValidValue="StaticList";
              this.ListOfStaitcList=element.value;
              this.showList=true;
          }
        }
        if(element.key=="HideFalid"){
          this.HideFalid=element.value;
        }
        

     
   });
  }

}

setIntialBehaviorValues(){
  this.Required="APMDefault";
  this.Validation="APMDefault";
  this.DefaultValue="APMDefault";
  this.DisabledValue="APMDefault";
  this.FormateValue="APMDefault";
  this.ValidValue="APMDefault";
  this.HideFalid="APMDefault";
  this.MaskedFiedChecked=false;
  this.maskedFieldValue="";
  this.flagShowValidation=false;
  this.showStaticFlag=false;
  this.StaticValueEnterd=null;
  this.validValueSelectedColumn=undefined;
  this.litteralValueFlag=false;
  this.LitteralValue=undefined;
  this.CustomeFormat=undefined;
  this.customeFormateRgex=false;
  this.FixedDigitAfterDecimalPointDemo=null;
  this.FixedDigitBeforeDecimalPointDemo=null;

}

SetRequiredDefault(evt){
 
  var target = evt.target;
  if (target.checked) {
   this.Required ="APMDefault"
  }
}
falgTypeInclusAndExc:any;
handleBetweenChange(evt,type:any){
  this.selectedBetewenType=undefined;
  this.flagShowBetweenDrop = true;
  this.flagShowValidation=false;
  this.StaticValueEnterd1=undefined;
  this.StaticValueEnterd2=undefined;
  this.validValueSelectedColumn1=undefined;
  this.validValueSelectedColumn2=undefined;
  this.showStaticValue1=false;
  this.showStaticValue2=false;
  this.showDynamicColumn1=false;
  this.showDynamicColumn2=false;
  if(type=="BetweenExclusive"){
this.falgTypeInclusAndExc=false;
  }else if(type=="BetweenInclusive"){
    this.falgTypeInclusAndExc=true;
  }
}
SelectbetweenType(){
 // 
  if(this.selectedBetewenType =="staticValue"){
    //show static
    this.showStaticValue1=true;
    this.showStaticValue2=true;
    this.showDynamicColumn1=false;
    this.showDynamicColumn2=false;
    this.StaticValueEnterd=undefined;
    this.StaticValueEnterd2=undefined;
  }else if(this.selectedBetewenType =="NumericColumn"){
    this.columnsList=this.columnsListDemo;
    this.showStaticValue1=false;
    this.showStaticValue2=false;
    this.showDynamicColumn1=true;
    this.showDynamicColumn2=true;
    this.StaticValueEnterd=undefined;
    this.StaticValueEnterd2=undefined;

  }
}

}

