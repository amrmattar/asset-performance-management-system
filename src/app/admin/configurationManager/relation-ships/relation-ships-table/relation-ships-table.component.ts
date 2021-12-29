import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { SortEvent } from 'primeng/api';
import { RelationDataResponse } from 'src/models/relationShip/RelationDataResponse';
import { RelationShipPagginationRequest } from 'src/models/relationShip/RelationShipPagginationRequest';
import { Result } from 'src/models/responses/Result';
import { TableIds } from 'src/models/responses/systable';
import { Pager2Service } from 'src/services/Pager2Service';
import { RelationshipService } from 'src/services/RelationshipService';

@Component({
  selector: 'app-relation-ships-table',
  templateUrl: './relation-ships-table.component.html',
  styleUrls: ['./relation-ships-table.component.scss'],
  providers:[Pager2Service]
})
export class RelationShipsTableComponent implements OnInit ,OnChanges{
  @Input() relationTableId: TableIds;
  _RelationShipPagginationRequest:RelationShipPagginationRequest;
  _RelationDataResponse:RelationDataResponse[]=[];
  pageNumber:number=1;
  pageSize:number=5;
  totalcount:number;
  toPageSize:number=0;
  fromPageSize:number=0;
  pager: any = {};
  itemSelectId:any;
  public search: string;
  record:any;
  @Output() relationDefEvent = new EventEmitter<any>();
  constructor(
    private _RelationshipService : RelationshipService,
     private pagerServ: Pager2Service) {
    this._RelationShipPagginationRequest=new RelationShipPagginationRequest();
    this._RelationDataResponse=new Array<RelationDataResponse>();
   }

  ngOnInit(): void {

  }

  ngOnChanges() {
    this.GetAllDataSheetPaggination(this.relationTableId.tableKey);
  }
 
  AddDefRelationShip(){
    this.setRelationDef();
    this.sendDefKey(0);
  }

  setRelationDef(){
    this._RelationshipService.showRelationshipForm = false;
    this._RelationshipService.showDefGrid = false;
    this._RelationshipService.showDefRelation = true;
    this._RelationshipService.showDefForm = true;
  }

  GetAllDataSheetPaggination(tkey:any):any{
     
    this._RelationShipPagginationRequest=new RelationShipPagginationRequest();
    this._RelationDataResponse=new Array;
    this._RelationShipPagginationRequest.tableKey=tkey;
    this._RelationShipPagginationRequest.pageNumber=this.pageNumber;
    this._RelationShipPagginationRequest.pageSize=this.pageSize;
    this._RelationshipService.GetAllRelationShipPaggination(this._RelationShipPagginationRequest).subscribe((res:Result)=>{
      if(res.model != null)
      this._RelationShipPagginationRequest=res.model.data;
      this.totalcount=res.model.totalCount;
       this.pager = this.pagerServ.getPager(res.model.totalCount, res.model.currentPage,this.pageSize);
       this.calculateInforPaggination(res.model.currentPage,this.pageSize,this.totalcount);
    })
 }

 paggination(pageNumber:number,pageSize:number){
  this._RelationShipPagginationRequest=new RelationShipPagginationRequest();
  this._RelationDataResponse=new Array;
  this._RelationShipPagginationRequest.tableKey=this.relationTableId.tableKey;
  this._RelationShipPagginationRequest.pageNumber=pageNumber;
  this._RelationShipPagginationRequest.pageSize=pageSize;
      this._RelationshipService.GetAllRelationShipPaggination(this._RelationShipPagginationRequest).subscribe((res:Result)=>{
      if(res.model != null)
      this._RelationShipPagginationRequest=res.model.data;
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

selectRecord(defKey:any){
  this.itemSelectId=defKey;
}

filter(){ 
  this._RelationShipPagginationRequest=new RelationShipPagginationRequest();
  this._RelationDataResponse=new Array;
  this._RelationShipPagginationRequest.tableKey=this.relationTableId.tableKey;
  this._RelationShipPagginationRequest.pageNumber=this.pageNumber;
  this._RelationShipPagginationRequest.pageSize=this.pageSize;
  this._RelationShipPagginationRequest.search=this.search;
      this._RelationshipService.GetAllRelationShipPaggination(this._RelationShipPagginationRequest).subscribe((res:Result)=>{
      if(res.model != null)
      this._RelationShipPagginationRequest=res.model.data;
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

GoToEditRelationDef(defKey){
  this.setRelationDef();
  this.sendDefKey(defKey);
}

sendDefKey(id) {
  this.record={ckey:id};
  this.relationDefEvent.emit(this.record)
}
}
