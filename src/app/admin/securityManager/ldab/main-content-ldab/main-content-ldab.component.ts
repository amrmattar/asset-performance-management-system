import { Component, OnInit } from '@angular/core';
import { data } from './datasource';
import {  CommandModel } from '@syncfusion/ej2-angular-grids';
import { LdabDataService } from 'src/services/ldab-data.service';
@Component({
  selector: 'app-main-content-ldab',
  templateUrl: './main-content-ldab.component.html',
  styleUrls: ['./main-content-ldab.component.scss']
})
export class MainContentLdabComponent implements OnInit {
  public data: string[] = ['Cairo', 'Aswan', 'Alex', 'Obour', 'USA', 'UK'];
  // set placeholder text to DropDownList input element
  public placeholder: string = 'Select Site';
  public headerText: Object = [{ 'text': 'Users' }, { 'text': 'Field Mapping' },{ 'text': 'Roles Mapping' }];
  public data1: object[];
  public editSettings: Object;
  public pageSettings: Object;
  isChecked:any=false;
  isChecked2:any=true;
  public commands: CommandModel[];
  showRequire: boolean;
  tabSaveBtn: boolean=false;
  showaccurroles: boolean=false;
  item: any={Name:"",id:""};
  caption:any;
  constructor(private Ldabdataservice:LdabDataService) { 
      this.Ldabdataservice.getcaptionInfo().subscribe(x => {
        this.item = x;
        this.caption=this.item.Name;
      })


  }

  ngOnInit(): void {
    this.data1 = data;
    this.editSettings = { allowDeleting: true };
        this.pageSettings = {pageCount: 5};
        this.commands = [{ type: 'Delete', buttonOption: { iconCss: 'e-icons e-delete', cssClass: 'e-flat' } },];
  }
  checkrequire(event: any){
    console.log(event);
    if(event == 'Require'){
      this.showRequire = true;
    } else {
      this.showRequire = false;
    }
  } 
  checkaccurroles(event: any){
    console.log(event);
    if(event == 'accurroles'){
      this.showaccurroles = true;
    } else {
      this.showaccurroles = false;
    }
  }

  onTabChange(args: any){
    // You can add your code Here
    console.log(args)
    if(args.selectingIndex != 0){
      this.tabSaveBtn = true;
    }else {
      this.tabSaveBtn = false;
    }
  }
  updatecaption(){
    this.item.Name=this.caption;
    this.Ldabdataservice.UpdateDataSource(this.item);

  }
}
