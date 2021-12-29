import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { TablesRepository } from '../../../data/tables.repository';
import { SharedataService } from '../../securityManager/service/sharedata.service';

@Component({
  selector: "conf-topnav",
  templateUrl: "./conf.top.nav.component.html",
  styleUrls: ['./conf.top.nav.component.scss']
})
export class ConfigurationManagerTopNavComponent {
  clickEventSubscription:Subscription;
  tabName:string;
  constructor(private sharedService:SharedataService,private tableRepo: TablesRepository) {
    this.tabName="Information";
    this.clickEventSubscription= this.sharedService.getClickEvent().subscribe(()=>{
      this.incrementCount();
    })
  }
  incrementCount(){
    this.tabName="Information";
  }
  setShowForm() {
    this.tableRepo.showFields = false;
    this.tableRepo.showForm = true;
    this.tableRepo.showDataSheet = false;
    this.tableRepo.showInfoForm = false;
    this.tableRepo.showTableDataSheet=false;
    this.tableRepo.showinfoDataSheet=false;
    this.tableRepo.showDataSheet=false;
    this.tableRepo.TableLayoutDataSheet=false;
    this.tabName='Information';
  }
  onTabClick() {
    this.tableRepo.showForm = false;
  }
  setShowFields() {

    this.tableRepo.showFields = true;
    this.tableRepo.showInfoForm = false;
    this.tableRepo.showDataSheet = false;
    this.tableRepo.showTableDataSheet=false;
    this.tableRepo.showinfoDataSheet=false;
    this.tableRepo.showDataSheet=false;
    this.tableRepo.TableLayoutDataSheet=false;
    this.tabName='Fields';
  }
  get showForm() {
    return this.tableRepo.showForm;
  }
  get showFields() {
    return this.tableRepo.showFields;
  }
  get showDataSheet() {
    return this.tableRepo.showDataSheet;
  }
  setShowDataSheet(){
     
    this.tableRepo.showFields = false;
    this.tableRepo.showInfoForm = false;
    this.tableRepo.showDataSheet = true;
    this.tableRepo.showTableDataSheet=true;
    this.tableRepo.showinfoDataSheet=false;
    this.tableRepo.showSectionDataSheet=false;
    this.tableRepo.TableLayoutDataSheet=false;
    this.tabName='Datasheets';
  }
 
}
