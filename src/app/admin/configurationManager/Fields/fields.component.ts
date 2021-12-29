


import { Component, Input } from '@angular/core';
import { ColumnData } from 'src/models/requests/columnDataRequest';
import { TableIds } from 'src/models/responses/systable';
import { TablesRepository } from '../../../data/tables.repository';

@Component({
  selector: "fields",
  templateUrl: "./fields.component.html"
})
export class FieldsComponent {
  @Input() childMessage: TableIds;
  constructor(private tableRepo: TablesRepository) {
    this.childMessage=new TableIds();
  }
  flag: any;

  flagBack($event) {
     
    this.flag = $event
  }

  record: ColumnData;

  selectrecord($event) {
    this.record = $event
  }

  get ShowBehavior(){
    return this.tableRepo.showBehavior;
  }
}
