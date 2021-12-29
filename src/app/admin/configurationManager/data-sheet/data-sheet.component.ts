import { Component, Input, OnInit } from '@angular/core';
import { TablesRepository } from 'src/app/data/tables.repository';
import { TableIds } from 'src/models/responses/systable';

@Component({
  selector: 'app-data-sheet',
  templateUrl: './data-sheet.component.html',
  styleUrls: ['./data-sheet.component.css']
})
export class DataSheetComponent implements OnInit {
  @Input() childMessage: TableIds;
  flag: any;
  constructor(private tableRepo: TablesRepository) {
    this.childMessage=new TableIds();
  }
 
  ngOnInit(): void {

  }
 

  flagBack($event) {
     
    this.flag = $event
  }


  get showTableDataSheet(){
   return  this.tableRepo.showTableDataSheet
  }


  get showinfoDataSheet(){
    return this.tableRepo.showinfoDataSheet;
  }
  
  get showSectionDataSheet(){
    return this.tableRepo.showSectionDataSheet;
  }

  get showTableLayoutDataSheet(){
    return this.tableRepo.TableLayoutDataSheet;
  }

  
  typeOfForm: any;

  receiveMessage($event) {
    this.typeOfForm = $event
  }
  

}
