

import { Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { NestedTreeControl } from '@angular/cdk/tree';
import { MatTreeNestedDataSource } from '@angular/material/tree';
import { SysTable, TableIds } from '../../../../models/responses/systable';
import { TableService } from 'src/services/TableService';
import {TreeNode} from 'primeng/api';
import { Result } from 'src/models/responses/Result';
import { RelationshipService } from 'src/services/RelationshipService';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { SharedataService } from '../../securityManager/service/sharedata.service';
import { TablesRepository } from 'src/app/data/tables.repository';
@Component({
  selector: "conf-sidebar",
  templateUrl: "./sidebar.component.html",
  styleUrls: ['./sidebar.component.scss','./sidebar.component.css'],
  
  providers:[TableService]
})
export class TablesSidebarComponent implements OnInit,OnChanges {
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
    if(this.itemSelectId == undefined){
      this.itemSelectId=0;
    }
    if(this.InfoFormMessage != undefined){
      if(this.InfoFormMessage.type=="create")
      this.GetAllTablesv2("",this.itemSelectId);
  
      if(this.InfoFormMessage.type == "delete")
      this.GetAllTablesv2("",this.parentSelectId);
      this.itemSelectId=0;
    }
    if(this.messageRecevedFromRelationForm != undefined){
      if(this.messageRecevedFromRelationForm.type == "create"){
        let obje={tableKey:this.messageRecevedFromRelationForm.tableKey,ptableKey:this.messageRecevedFromRelationForm.ptableKey}
        this.GetAllRelationshipTables("", 0,obje);
      }
      if(this.messageRecevedFromRelationForm.type == "delete"){
        let obje={tableKey:this.messageRecevedFromRelationForm.tableKey,ptableKey:this.messageRecevedFromRelationForm.ptableKey}
        this.GetAllRelationshipTables("", 0,obje);
      }
    }
   
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
   // 
    this.showNav();
    this.showForm();
    this.tableRepo.showSidebar = false;
    this.tableRepo.showFields = false;
    this.tableRepo.showInfoForm = true;
    this.tableRepo.showNav = false;
    this.tableRepo.showForm = true;
    this.tableRepo.showDataSheet=false;
    this._RelationshipService.showRelationShips=false;
    var infoForm = <HTMLFormElement>document.getElementById('infoForm');
    if (infoForm !== null){
      infoForm.reset();
    }
     //if add to root
      if(this.itemSelectId == 0 || this.itemSelectId == undefined){
        this.sendMessage(0,0);
      }else{
        //if select item 
        this.sendMessage(0,this.itemSelectId);
      }

  }
  public setSearch() {
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
  showRelationship() {
    this.Entity = false;
    this.Relationships = true;
    // this.tableIds.tableKey=1;
    console.log("showRelationship");
      this.GetAllRelationshipTables("", 0);
      this.resetFormRelationShips();
      this.tableRepo.entityIsClicked = false;
      this.tableRepo.showSidebar = false;
      this.tableRepo.showFields = false;
      this.tableRepo.showInfoForm = false;
      this.tableRepo.showNav = false;
      this.tableRepo.showForm = false;
      this.tableRepo.showDataSheet = false;
      this._RelationshipService.showRelationShips = false;
      this._RelationshipService.showRelationshipForm = false;
      this._RelationshipService.showRelationshipNavbar = true;
      this._RelationshipService.showDefForm=false;
     this.tempEntity ='disabled';
    this.tempRelationships ='active';
    }
  setshowSidebar() {
    // console.log(this.tableIds.tableKey)
    this.tableIds.tableKey=null;
    this.Entity = true;
    this.Relationships = false;
    var infoForm = <HTMLFormElement>document.getElementById('infoForm');
    if (infoForm !== null){
      infoForm.reset();
    }
    this.tableRepo.entityIsClicked = false;
    this.tableRepo.table = {};
    this.tableRepo.showSidebar = false;
    this.tableRepo.showFields = false;
    this.tableRepo.showInfoForm = false;
    this.tableRepo.showNav = false;
    this.tableRepo.showForm = false;
    this.tableRepo.showDataSheet=false;
    this.itemSelectId=0;
    this._RelationshipService.showRelationShips = false;
    this._RelationshipService.showRelationshipForm = false;
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
  message: any =0 ;

  @Output() messageEvent = new EventEmitter<any>();
  @Output() messageRelationShipEvent = new EventEmitter<any>();
  sendMessage(tableKey:any,ptableKey:any) {
    this.tableIds={
      tableKey:tableKey,
      ptableKey:ptableKey
    };
      this.messageEvent.emit( this.tableIds)
    }

  sendMessageToRelationShipForm(tableKey:any,ptableKey:any) {
      this.tableIds={
        tableKey:tableKey,
        ptableKey:ptableKey
      };
        this.messageRelationShipEvent.emit( this.tableIds)
      }
    

 
/// This Method is for showing the same buttons as Entities 



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
    // 
    this.tableRepo.showSidebar = false;
    this.tableRepo.showFields = false;
    this.tableRepo.showInfoForm = false;
    this.tableRepo.showNav = false;
    this.tableRepo.showForm = false;
    this.tableRepo.showDataSheet = false;
    this._RelationshipService.showRelationShips = true;
    this._RelationshipService.showRelationshipForm=true;
    this.sendMessageToRelationShipForm(0,0);
    
    // Show Nav Bar by default
    this._RelationshipService.showRelationshipNavbar= true;
  }

  //////////////
  selectItem(rowData: any, rowNode?: any) {
    if(rowData != undefined){
      this.itemSelectId = rowData.tableKey;
      this.parentSelectId = rowData.ptableKey;
      this.tableRepo.showSidebar = false;
      this.tableRepo.showFields = false;
      this.tableRepo.showInfoForm = true;
      this.tableRepo.showNav = true;
      this.tableRepo.showForm = true;
      this.tableRepo.showDataSheet = false;
      this.sendMessage(this.itemSelectId, rowData.ptableKey);
      this.tableRepo.entityIsClicked = true;
      this.disabledFlag = false;
      this._RelationshipService.showRelationShips = false;
    }
  }
  selectItemRelationship(rowData:any){
    debugger
    this.sharedService.sendClickEvent();
    if(rowData != undefined){
     
      this.itemSelectId=rowData.tableKey;
      this.parentSelectId = rowData.ptableKey;
      this.tableRepo.showSidebar = false;
      //  this.tableIds.tableKey=1;
       console.log("selectItemRelationship");
      this.tableRepo.showFields = false;
      this.tableRepo.showInfoForm = false;
      this.tableRepo.showNav = false;
      this.tableRepo.showForm = false;
      this.tableRepo.entityIsClicked = true;
      this.tableRepo.showDataSheet = false;
      this._RelationshipService.showRelationShips = true;
      this._RelationshipService.showRelationshipForm=true;
      this._RelationshipService.showDefForm=false;
      this._RelationshipService.showDefGrid = false;
      this.sendMessageToRelationShipForm(this.itemSelectId,rowData.ptableKey);
      this.disabledFlag=false;
    }
  }

    
}
