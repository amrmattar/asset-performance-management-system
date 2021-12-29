import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { TextBoxComponent } from '@syncfusion/ej2-angular-inputs';
import { ListBoxComponent } from '@syncfusion/ej2-angular-dropdowns';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { SelectEventArgs } from "@syncfusion/ej2-lists";
import { LdabDataService } from 'src/services/ldab-data.service';
@Component({
  selector: 'app-sidebar-ldab',
  templateUrl: './sidebar-ldab.component.html',
  styleUrls: ['./sidebar-ldab.component.scss']
})
export class SidebarLdabComponent implements OnInit {
  public config: PerfectScrollbarConfigInterface = {};
  selelctedId:any;
  dataSource:any;
  @ViewChild('default')
    public textboxObj: TextBoxComponent;

        public onCreate(args: any) :void {
        this.textboxObj.addIcon("append", "e-icons e-Treeview1");
    }

 

  public fields: Object = { text: 'Name', groupBy: 'category' };
  constructor(private Ldabdataservice:LdabDataService) { }

  ngOnInit(): void {
   
  }

  get getDataSource(){
    return this.Ldabdataservice.dataSource;
  }
  onSelect(args: SelectEventArgs){
    console.log(args.text)
       }

       select(item){
         let newItem={Name:item.Name,id:item.id}
        console.log(item);
        this.selelctedId=item.id;
        this.Ldabdataservice.setcaptionInfo(newItem);
        this.Ldabdataservice.settabInfo('Add New');
       }
       tapname(tabname){
        this.Ldabdataservice.settabInfo(tabname);
       }

}
