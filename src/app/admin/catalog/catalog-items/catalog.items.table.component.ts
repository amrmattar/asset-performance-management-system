import { Component, Input, ViewContainerRef, ViewChild, ComponentFactoryResolver, OnInit, ComponentRef, TemplateRef, OnChanges } from '@angular/core';

import { SelectionType, DatatableComponent, ColumnMode } from '@swimlane/ngx-datatable';

import { CatalogsRepository } from 'src/app/data/catalogs.repository';
import { CatalogItemsRequest } from 'src/models/requests/catalogItemsRequest';
import { SortEvent } from 'primeng/api';
import { CatalogService } from 'src/services/CatalogService';
import { PagginationRequest } from 'src/models/requests/PagginationRequest';
import { Result } from 'src/models/responses/Result';
import { Pager2Service } from 'src/services/Pager2Service';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

@Component({
  selector: "catalog-items-table",
  styleUrls: ['./catalog.items.table.component.scss'],
  templateUrl: "./catalog.items.table.component.html"

})
export class CatalogItemsTableComponent implements OnInit,OnChanges{
  public config: PerfectScrollbarConfigInterface = {};
  todayDate : Date ;
  categoryItem:any[];
    _pagginationRequest:PagginationRequest;
    pageNumber:number=1;
    pageSize:number=5;
    totalcount:number;
    toPageSize:number=0;
    fromPageSize:number=0;
    pager: any = {};
  public search: string;
  CurrentPage:any;
  @ViewChild(DatatableComponent) table: DatatableComponent;
  columns = [
    { prop: 'shortDesc', name: 'ShortDesc' },
    { prop: 'modifiedDate', name: 'ModifiedDate' },
    { prop: 'modifiedByName', name: 'ModifiedByName' },
    { prop: 'createdDate', name: 'CreatedDate' },
    { prop: 'ikey', name: 'IKey' },
  ];
  editing = {};
  ColumnMode = ColumnMode;
  itemsPerPage = 10;
  itemOptionsPerPage = [5, 10, 20];
  selected = [];
  SelectionType = SelectionType;
  selectAllState = '';
  catalogItemsRequest: CatalogItemsRequest = {};

  constructor(private repo: CatalogsRepository,
    private _CatalogService:CatalogService,
    private pagerServ: Pager2Service) {
    this._pagginationRequest=new PagginationRequest();
    this.todayDate=new Date();
  }
  ngOnInit(): void {
    
  }
 
  public setSearch() {
    this.repo.filter.search = this.search;
    this.repo.getCatalogItems();

  }

   GetcatalogItemsRequest(catKey:string):any{
     this._pagginationRequest=new PagginationRequest();
     this.categoryItem=new Array;
     this._pagginationRequest.catKey=catKey;
     this._pagginationRequest.pageNumber=this.pageNumber;
     this._pagginationRequest.pageSize=this.pageSize;
     this._CatalogService.GetCatalogsPaggination(this._pagginationRequest).subscribe((res:Result)=>{
       if(res.model != null)
       this.categoryItem=res.model.data;
       this.totalcount=res.model.totalCount;
        this.pager = this.pagerServ.getPager(res.model.totalCount, res.model.currentPage,this.pageSize);
        this.calculateInforPaggination(res.model.currentPage,this.pageSize,this.totalcount);
        this.CurrentPage=res.model.currentPage;
     })
   
  
  }
  updateFilter(event) {
    this.search = event.target.value.toLowerCase().trim();
    this.repo.filter.search = this.search;
    this.repo.getCatalogItems();
  }
  
  onItemsPerPageChange(itemCount) {
    this.itemsPerPage = itemCount;
  }
  searchCategoryItem(){
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
  this.categoryItem=new Array;
  this._pagginationRequest.catKey=this.childMessage;
  this._pagginationRequest.pageNumber=this.pageNumber;
  this._pagginationRequest.pageSize=this.pageSize;
  this._pagginationRequest.search=this.search;
  this._CatalogService.GetCatalogsPaggination(this._pagginationRequest).subscribe((res:Result)=>{
    if(res.model != null) 
    this.categoryItem=res.model.data;
    this.totalcount=res.model.totalCount;
     this.pager = this.pagerServ.getPager(res.model.totalCount, res.model.currentPage,this.pageSize);
     this.calculateInforPaggination(res.model.currentPage,this.pageSize,this.totalcount);
     this.CurrentPage=res.model.currentPage;
  })
}

paggination(pageNumber:number,pageSize:number){
  this.categoryItem=new Array;
  this._pagginationRequest.catKey=this.childMessage;
  this._pagginationRequest.pageNumber=pageNumber;
  this._pagginationRequest.pageSize=pageSize;
  this._CatalogService.GetCatalogsPaggination(this._pagginationRequest).subscribe((res:Result)=>{
    if(res.model != null)
    this.categoryItem=res.model.data;
    this.totalcount=res.model.totalCount;
     this.pager = this.pagerServ.getPager(res.model.totalCount, res.model.currentPage,this.pageSize);
     this.calculateInforPaggination(res.model.currentPage,this.pageSize,this.totalcount);
     this.CurrentPage=res.model.currentPage;
  })
}
@Input() childMessage: string;
ngOnChanges() {
    this.search=null
    this.GetcatalogItemsRequest(this.childMessage);

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
}
