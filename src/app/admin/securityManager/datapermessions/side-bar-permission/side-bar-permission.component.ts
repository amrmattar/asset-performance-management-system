import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';

import { SysTable, TableIds } from '../../../../models/responses/systable';
import { TableService } from 'src/services/TableService';
import {TreeNode} from 'primeng/api';
import { Result } from 'src/models/responses/Result';
import { RelationshipService } from 'src/services/RelationshipService';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { TablesRepository } from 'src/app/data/tables.repository';
import { SharedataService } from '../../service/sharedata.service';
@Component({
  selector: 'app-side-bar-permission',
  templateUrl: './side-bar-permission.component.html',
  styleUrls: ['./side-bar-permission.component.scss'],
  providers:[TableService]
})
export class SideBarPermissionComponent implements OnInit {
  public config: PerfectScrollbarConfigInterface = {};
  Relationships:boolean = false ;
  Entity : boolean = true;
  tempEntity:string ='active';
  tempRelationships:string ='disabled';
  @Input() InfoFormMessage: any;
  @Input() messageRecevedFromRelationForm:any;
  @Input() relationShipMessage:any;
  tableIds:TableIds;
  treeNodeTableData:TreeNode[];
  //
  RelationTableData:Result;
  //
  public search: string;
  activeNode: any = {};
   treeControl = new NestedTreeControl<SysTable>(node => node.tables);
  dataSource = new MatTreeNestedDataSource<SysTable>();
  @Output() messageFromSideBarPermissionEvent = new EventEmitter<any>();
  constructor(private sharedService:SharedataService,
    private tableRepo: TablesRepository,
              private _TableService:TableService,
              private _RelationshipService:RelationshipService) {
              this.RelationTableData=new Result();
    //this.tableRepo.getTables();
    this.tableIds=new TableIds();
     
  }
  
  ngOnInit(): void {
    this.GetAllTablesv2("",0);
  }
  ngOnChanges() {

   
  }
  hasChild = (_: number, node: SysTable) => !!node.tables && node.tables.length > 0;

  get tables(): SysTable[] {
    this.dataSource.data = this.tableRepo.tables;
    return this.tableRepo.tables;
  }
  get table(): SysTable {
    return this.tableRepo.table;
  }
  resetForm() {
      if(this.itemSelectId == 0 || this.itemSelectId == undefined){
        this.sendMessage(0,0);
      }else{
        //if select item 
        this.sendMessage(0,this.itemSelectId);
      }

  }
  public setSearch() {
    console.log(this.search);
   this.GetAllTablesv2(this.search,0);
  }
 

  get showSidebar(): boolean {
    return this.tableRepo.showSidebar;
  }
  get entityIsClicked(): boolean {
    return this.tableRepo.entityIsClicked;
  }

  showNav() {
    this.tableRepo.showNav = true;
  }
  showForm() {
    this.tableRepo.showForm = true;
  }
  disabledFlag:boolean=false;
  setshowSidebar() {
    // this.tableIds.tableKey=null;
    this.Entity = true;
    this.Relationships = false;
    this.resetForm();
    var infoForm = <HTMLFormElement>document.getElementById('infoForm');
    if (infoForm !== null){
      infoForm.reset();
    }
    this.tableRepo.table = {};
    this.itemSelectId=0;
    this.tempEntity ='active';
    this.tempRelationships ='disabled';
    
  }

  GetAllTablesv2(search:string,itemSelectId){
    // 
    if(search != undefined && itemSelectId != undefined){
      this._TableService.GetAllTablesv2(search,itemSelectId).subscribe(res=>{
        this.treeNodeTableData=res.model;
        this.selectItem(this.InfoFormMessage);
      })
    }
  }
  itemSelectId:any;
  parentSelectId:any;
 
  selectItem(rowData: any, rowNode?: any) {
    if(rowData != undefined){
      this.itemSelectId = rowData.tableKey;
      this.parentSelectId = rowData.ptableKey;
      this.sendMessage(this.itemSelectId, rowData.ptableKey);
      this.tableRepo.entityIsClicked = true;
      this.disabledFlag = false;
      this._RelationshipService.showRelationShips = false;
    }

    //this._RelationshipService.showRelationshipForm = false;
  }

  message: any =0 ;


  @Output() messageRelationShipEvent = new EventEmitter<any>();
  sendMessage(tableKey:any,ptableKey:any) {
    this.tableIds={
      tableKey:tableKey,
      ptableKey:ptableKey
    };
      this.messageFromSideBarPermissionEvent.emit(this.tableIds)
    }

  sendMessageToRelationShipForm(tableKey:any,ptableKey:any) {
      this.tableIds={
        tableKey:tableKey,
        ptableKey:ptableKey
      };
      this.messageFromSideBarPermissionEvent.emit(this.tableIds)
      }
    

 
/// This Method is for showing the same buttons as Entities 
showRelationship() {
   
  this.Entity = false;
  this.Relationships = true;

    this.GetAllRelationshipTables("", 0);
    this.resetFormRelationShips();
   this.tempEntity ='disabled';
  this.tempRelationships ='active';
  }


  GetAllRelationshipTables(search: string, itemSelectId,obje?:any) {
    // 
    if (search != undefined && itemSelectId != undefined) {
      this._RelationshipService.getAllRelationshipTables(search, itemSelectId).subscribe(res => {
        this.RelationTableData = res;
        this.selectItemRelationship(obje);
      })
    }
  }

  resetFormRelationShips(): void {
    this.sendMessageToRelationShipForm(0,0);
  
  }

  //////////////
  selectItemRelationship(rowData:any){
    // 
    if(rowData != undefined){
      this.itemSelectId=rowData.tableKey;
      this.sendMessageToRelationShipForm(this.itemSelectId,rowData.ptableKey);
      this.disabledFlag=false;
      this.sharedService.sendClickEvent();
    }

  }

    
}
