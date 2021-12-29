import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { TablesRepository } from '../../../data/tables.repository';
import {  TableIds } from '../../../../models/responses/systable';
import { ColumnData } from '../../../../models/requests/columnDataRequest';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { TableService } from 'src/services/TableService';
import { Pager2Service } from 'src/services/Pager2Service';
import { ColumnPagginationRequest } from 'src/models/requests/ColumnPagginationRequest';
import { Result } from 'src/models/responses/Result';
import { SortEvent } from 'primeng/api';
import { DataSheetService } from 'src/services/DataSheetService';
import { DataSheetPagginationRequest } from 'src/models/requests/DataSheetPagginationRequest';
import { SysDatasheetVm } from 'src/models/responses/SysDatasheetVm';
@Component({
  selector: 'app-table-data-sheet',
  templateUrl: './table-data-sheet.component.html',
  styleUrls: ['./table-data-sheet.component.scss','./table-data-sheet.component.css'],
  providers:[TableService,Pager2Service,DataSheetService]
})
export class TableDataSheetComponent implements OnInit {
  // variables
  record:any;
  @Input() childFlag: any;
  @Input() FieldMessage: TableIds;
  typeOfForm: any;
  @Output() messageEvent = new EventEmitter<any>();

  _columnPagginationRequest:ColumnPagginationRequest;
  _DataSheetPagginationRequest:DataSheetPagginationRequest;
  pageNumber:number=1;
  pageSize:number=5;
  totalcount:number;
  toPageSize:number=0;
  fromPageSize:number=0;
  public search: string;
  columns:ColumnData[];
  Datasheets:SysDatasheetVm[];
  pager: any = {};
//ctor
  constructor(private tableRepo: TablesRepository,
    private _TableService:TableService,
    private _DataSheetService:DataSheetService,
    private pagerServ: Pager2Service,
    private notifications: NotificationsService) {
    this.FieldMessage=new TableIds();
    this.columns=new Array<ColumnData>();
    this._columnPagginationRequest=new ColumnPagginationRequest();
    this._DataSheetPagginationRequest=new DataSheetPagginationRequest();
    this.Datasheets=new Array<SysDatasheetVm>();
  }
  ngOnInit(): void {
    
  }
 
  get showDataSheet(): boolean {
    return this.tableRepo.showDataSheet;
  }
 
  //ngOnchange
  ngOnChanges() {
      if(this.FieldMessage != undefined && this.FieldMessage.tableKey != 0){
       this.GetAllDataSheetPaggination(this.FieldMessage.tableKey); 
      }else{
        // this.table={tableKey :0};
      }
  }
 
  GetAllDataSheetPaggination(tkey:any):any{
     
    this._DataSheetPagginationRequest=new DataSheetPagginationRequest();
    this.Datasheets=new Array;
    this._DataSheetPagginationRequest.tKey=tkey;
    this._DataSheetPagginationRequest.pageNumber=this.pageNumber;
    this._DataSheetPagginationRequest.pageSize=this.pageSize;
    this._DataSheetService.GetAllDataSheetPaggination(this._DataSheetPagginationRequest).subscribe((res:Result)=>{
      if(res.model != null)
      this.Datasheets=res.model.data;
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
  this._DataSheetPagginationRequest.tKey=this.FieldMessage.tableKey;
  this._DataSheetPagginationRequest.pageNumber=pageNumber;
  this._DataSheetPagginationRequest.pageSize=pageSize;
  this._DataSheetService.GetAllDataSheetPaggination(this._DataSheetPagginationRequest).subscribe((res:Result)=>{
    if(res.model != null)
    this.Datasheets=res.model.data;
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
  this.Datasheets=new Array;
  this._DataSheetPagginationRequest.tKey=this.FieldMessage.tableKey;
  this._DataSheetPagginationRequest.pageNumber=this.pageNumber;
  this._DataSheetPagginationRequest.pageSize=this.pageSize;
  this._DataSheetPagginationRequest.search=this.search;
  this._DataSheetService.GetAllDataSheetPaggination(this._DataSheetPagginationRequest).subscribe((res:Result)=>{
    if(res.model != null)
     
    this.Datasheets=res.model.data;
    this.totalcount=res.model.totalCount;
     this.pager = this.pagerServ.getPager(res.model.totalCount, res.model.currentPage,this.pageSize);
     this.calculateInforPaggination(res.model.currentPage,this.pageSize,this.totalcount);
  })
}
itemSelectId:any=0;
selectRecord(selectedRecord:any){
  this.itemSelectId=selectedRecord;
}

SetshowinfoAddDataSheet(id=0){
    this.tableRepo.showTableDataSheet=false;
    this.tableRepo.showinfoDataSheet=true;
    this.typeOfForm={type:"info",id:id,tableTkey:this.FieldMessage.tableKey};
    this.sendMessage(); 
}
  SetshowinfoDataSheet(id=0){
    if(id>0){
      this.tableRepo.showTableDataSheet=false;
      this.tableRepo.showinfoDataSheet=true;
      this.typeOfForm={type:"info",id:id,tableTkey:this.FieldMessage.tableKey};
      this.sendMessage();
    }else{
      this.notifications.create('Success',"you must select one row", NotificationType.Warn, { theClass: 'outline primary', timeOut: 6000, showProgressBar: false });
  
    }
  }
 
  SetshowLayOutDataSheet(id){
    if(id >0){
      this.tableRepo.showTableDataSheet=false;
      this.tableRepo.showinfoDataSheet=false;
      this.tableRepo.showSectionDataSheet=true;
      this.typeOfForm={type:"layout",id:id,tableTkey:this.FieldMessage.tableKey};
      this.sendMessage();
    }else{
      this.notifications.create('Success',"you must select one row", NotificationType.Warn, { theClass: 'outline primary', timeOut: 6000, showProgressBar: false });
  
    }
  
  }
  sendMessage() {
   
    this.messageEvent.emit(this.typeOfForm)
  }

}

