



import { Component } from '@angular/core';
import { TablesRepository } from '../../data/tables.repository';
import { RelationshipService } from 'src/services/RelationshipService';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';

@Component({
  selector: "config-manager",
  templateUrl: "./configuration.manager.component.html"
})

export class ConfigurationManagerComponent {
  flag_msg:boolean=false;
  public config: PerfectScrollbarConfigInterface = {};
  constructor(private tableRepo: TablesRepository,private _RelationshipService:RelationshipService) {
    //this.repo.showSites = false;
    this.tableRepo.showFields = false;
    this.tableRepo.showForm = false;
    this.tableRepo.showDataSheet = false;
    this.tableRepo.showInfoForm = false;
    this.tableRepo.showTableDataSheet=false;
    this.tableRepo.showinfoDataSheet=false;
    this.tableRepo.showDataSheet=false;
    this.tableRepo.TableLayoutDataSheet=false;

  }

  get showFields(): boolean {
    return this.tableRepo.showFields;
  }
  get showdataSheet(){
    return this.tableRepo.showDataSheet;
  }
  
  get showRelationship():boolean{
    return this._RelationshipService.showRelationShips;
  }
  message:any;
  messageFromRelation:any;


  
  messageFromInfoForm:any;
  messageFromRelationForm:any;

  receiveMessage($event) {
    debugger
    this.message = $event
  }

  receiveMessageFromInfoForm($event) {
    debugger
    this.messageFromInfoForm = $event
  }

  receiveMessageOfRealtionShip($event) { 
    debugger
    this.messageFromRelation = $event;
  }

  receiveMessageRelationship(message:any) {  
    debugger
    this.messageFromRelationForm=message;
  }
}
