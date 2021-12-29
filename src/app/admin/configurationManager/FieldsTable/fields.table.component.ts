import { Component, EventEmitter, Input, OnChanges, Output } from '@angular/core';
import { TablesRepository } from '../../../data/tables.repository';
import { SysTable, TableIds } from '../../../../models/responses/systable';
import { ColumnData } from '../../../../models/requests/columnDataRequest';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { ColumnRequest } from 'src/models/requests/ColumnRequest';
import { TableService } from 'src/services/TableService';
import { Pager2Service } from 'src/services/Pager2Service';
import { ColumnPagginationRequest } from 'src/models/requests/ColumnPagginationRequest';
import { Result } from 'src/models/responses/Result';
import { SortEvent } from 'primeng/api';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { IsIdFieldsRequest } from 'src/app/models/requests/IsIdFieldsRequest';
import { TableData } from 'src/app/models/requests/tableDataRequest';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: "fields-table",
  templateUrl: "./fields.table.component.html",
  styleUrls: ['./fields.table.component.scss','./fields.table.component.css'],
  providers:[TableService,Pager2Service]
})
export class FieldsTableComponent implements OnChanges{
  // variables
  tableData:TableData;
  record:any;
  @Input() childFlag: any;
  @Input() FieldMessage: TableIds;
  _columnPagginationRequest:ColumnPagginationRequest;
  pageNumber:number=1;
  pageSize:number=5;
  totalcount:number;
  toPageSize:number=0;
  fromPageSize:number=0;
  public search: string;
  columns:ColumnData[];
  ColumnsOfDropDownList:ColumnData[];
  pager: any = {};
  IsIdFieldCaption:any=null;
  IsIdFieldsRequestList:IsIdFieldsRequest[]=[];
  NewIDTemplete:string="";
  CurrentIDTemplete:string="";
//ctor
  constructor(private tableRepo: TablesRepository,
    private _TableService:TableService,
    private pagerServ: Pager2Service,
    private spinner: NgxSpinnerService,
    private notifications: NotificationsService,
    private modalService: NgbModal,
    private _Toastr:ToastrService) {
    this.FieldMessage=new TableIds();
    this.columns=new Array<ColumnData>();
    this.ColumnsOfDropDownList=new Array<ColumnData>();
    this._columnPagginationRequest=new ColumnPagginationRequest();
    this.IsIdFieldsRequestList=new Array<IsIdFieldsRequest>();
    this.tableData=new TableData();
  }
  //get
  get table(): SysTable {
    return this.tableRepo.table;
  }
  get showInfoForm(): boolean {
    return this.tableRepo.showInfoForm;
  }
  get columnRequest(): ColumnData {
    return this.tableRepo.columnRequest;
  }
  public setSearch() {
    this.tableRepo.filter.search = this.search;
    this.tableRepo.getColumns();

  }
  //ngOnchange
  ngOnChanges() {
      if(this.FieldMessage != undefined && this.FieldMessage.tableKey != 0){
        this.GetAllColumnsPaggination(this.FieldMessage.tableKey);
      }else{
        // this.table={tableKey :0};
      }
  }
  GetColumn(search:any,tKey:any){
    let columnReq:ColumnRequest={
      search:search,
      tkey:tKey
    }
    this._TableService.GetAllColumns(columnReq).subscribe(res=>{
      this.ColumnsOfDropDownList=res.data.columnsDataList.filter(x=>x.tkey == this.FieldMessage.tableKey);
    })
  }
  GetAllColumnsPaggination(tkey:any):any{
    
    this._columnPagginationRequest=new ColumnPagginationRequest();
    this.columns=new Array;
    this._columnPagginationRequest.tKey=tkey;
    this._columnPagginationRequest.pageNumber=this.pageNumber;
    this._columnPagginationRequest.pageSize=this.pageSize;
    this._TableService.GetAllColumnsPaggination(this._columnPagginationRequest).subscribe((res:Result)=>{
      if(res.model != null)
      
      this.columns=res.model.data;
    
      this.totalcount=res.model.totalCount;
       this.pager = this.pagerServ.getPager(res.model.totalCount, res.model.currentPage,this.pageSize);
       this.calculateInforPaggination(res.model.currentPage,this.pageSize,this.totalcount);
    })
 }


calculateInforPaggination(currentPage:number,pageSize:number,totalcount:number){
  let demo=currentPage * pageSize;
  if(demo > totalcount){
    this.toPageSize=totalcount;
  }else{
    this.toPageSize=currentPage * pageSize;
  }
  this.fromPageSize=((currentPage -1)*pageSize)+1;
}

paggination(pageNumber:number,pageSize:number){
  this.columns=new Array;

  this._columnPagginationRequest.tKey=this.FieldMessage.tableKey;
  this._columnPagginationRequest.pageNumber=pageNumber;
  this._columnPagginationRequest.pageSize=pageSize;
  this._TableService.GetAllColumnsPaggination(this._columnPagginationRequest).subscribe((res:Result)=>{
    if(res.model != null)
    
    this.columns=res.model.data;
    this.totalcount=res.model.totalCount;
     this.pager = this.pagerServ.getPager(res.model.totalCount, res.model.currentPage,this.pageSize);
     this.calculateInforPaggination(res.model.currentPage,this.pageSize,this.totalcount);
  })
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

filter(){
  this.columns=new Array;
  this._columnPagginationRequest.tKey=this.FieldMessage.tableKey;
  this._columnPagginationRequest.pageNumber=this.pageNumber;
  this._columnPagginationRequest.pageSize=this.pageSize;
  this._columnPagginationRequest.search=this.search;
  this._TableService.GetAllColumnsPaggination(this._columnPagginationRequest).subscribe((res:Result)=>{
    if(res.model != null)
    
    this.columns=res.model.data;
    this.totalcount=res.model.totalCount;
     this.pager = this.pagerServ.getPager(res.model.totalCount, res.model.currentPage,this.pageSize);
     this.calculateInforPaggination(res.model.currentPage,this.pageSize,this.totalcount);
  })
}
itemSelectId:any;
selectRecord(selectedRecord:any,tkey:any){
  debugger;
 if(this.FieldMessage.tableKey  == tkey){
  this.tableRepo.showInfoForm=true;
  this.tableRepo.showBehavior=false;
  if(this.FieldMessage.tableKey == tkey){
   this.itemSelectId=selectedRecord;
   this.sendRecordId(selectedRecord);
  }else{
   this.notifications.create('info',"can not update this column from child table", NotificationType.Bare, { theClass: 'outline primary', timeOut: 6000, showProgressBar: false });
   
  }
 } 

   
}

  

  @Output() recordEvent = new EventEmitter<any>();
  flagSelect:boolean=false;
  sendRecordId(id) {
    this.record={ckey:id};

    
    this.recordEvent.emit(this.record)
  }

  openLg(content3) {
    this.IsIdFieldCaption=undefined;
    this.IsIdFieldCaption=null;
		this.modalService.open(content3, { size: 'lg' });
    this.GetTableByTableKey(this.FieldMessage.tableKey);
    this.GetColumn("",this.FieldMessage.tableKey);
	}

  AddToFieldIdList(){
    let Exist=this.IsIdFieldsRequestList.find(x=>x.columnId == this.IsIdFieldCaption);
    if(Exist != null){
      this.IsIdFieldCaption=null;
      this._Toastr.warning("this field already Exist");
      
    }else{
      let IsIdFieldsRequestObj=new IsIdFieldsRequest();
      IsIdFieldsRequestObj=
      {
        columnId:this.IsIdFieldCaption,
        seprator:""
      }
      this.IsIdFieldsRequestList.push(IsIdFieldsRequestObj);
      this.GetNewIDTemplete();
      this.IsIdFieldCaption=null;

    }

  }

  UpdateExistingRecord(){
    
    this.tableData.tableKey=this.FieldMessage.tableKey;
    this.tableData.jsonIsIdField=JSON.stringify(this.IsIdFieldsRequestList);
    this.tableData.newIDTemplete=this.NewIDTemplete;
    this.tableData.JsonIsIdFieldList=this.IsIdFieldsRequestList;
    this._TableService.UpdateExistingRecord(this.tableData).subscribe((res:any)=>{
      if(res.success){
        this._Toastr.success('Update Existing Record sucess', 'Sucess');
        this.modalService.dismissAll();
      }
    })
  }

  deleteItem(index:any){
      
    
    this.IsIdFieldsRequestList.splice(index, 1);
    this.GetNewIDTemplete();
    this.IsIdFieldCaption=undefined;
  }
  GetNewIDTemplete(){
    this.NewIDTemplete="";
    this.IsIdFieldsRequestList.forEach(element => {
      if(this.IsIdFieldsRequestList.indexOf(element) == this.IsIdFieldsRequestList.length -1){
        this.NewIDTemplete += element.columnId ;
      }else{
        this.NewIDTemplete += element.columnId + " " +element.seprator+ " ";
      }
   
    });
  }

  GetCurrentIDTemplete(){
    this.CurrentIDTemplete="";
    this.IsIdFieldsRequestList.forEach(element => {
      if(this.IsIdFieldsRequestList.indexOf(element) == this.IsIdFieldsRequestList.length -1){
        this.CurrentIDTemplete += element.columnId ;
      }else{
        this.CurrentIDTemplete += element.columnId + " " +element.seprator+ " ";
      }
   
    });
  }


  GetTableByTableKey(tableKey:any){
    this._TableService.GetTableByTableKey(tableKey).subscribe((res:any)=>{
      if( JSON.parse(res.model.jsonIsIdField) != undefined){
        this.IsIdFieldsRequestList= JSON.parse(res.model.jsonIsIdField);
      }

      this.GetCurrentIDTemplete();
      this.GetNewIDTemplete();
    })
  }


}

