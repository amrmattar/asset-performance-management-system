import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FieldSettingsModel, ToolbarSettingsModel } from '@syncfusion/ej2-dropdowns';
import { ListBoxComponent, CheckBoxSelection } from '@syncfusion/ej2-angular-dropdowns';
import { L10n, setCulture } from '@syncfusion/ej2-base';
import { orderDetails } from './data_grid';
import * as FileSaver from 'file-saver';
import * as XLSX from 'xlsx';

setCulture('en-US');

L10n.load({
    'en-US': {
        'pager': {
            'currentPageInfo': '',
            'totalItemsInfo': '{1} to {2} of {0}',
        }
    }
});
type AOA = any[][];
ListBoxComponent.Inject(CheckBoxSelection);
@Component({
  selector: 'app-apm-formation-export',
  templateUrl: './apm-formation-export.component.html',
  styleUrls: ['./apm-formation-export.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ApmFormationExportComponent implements OnInit {
  file_Type:any;
  public data_grid: Object[] = [];
  dataex: AOA = [];
  public initialPage: Object;
  wopts: XLSX.WritingOptions = { bookType: 'xlsx', type: 'array' };
  public data_drop: string[] = ['Excel', 'Xml'];
  fileName: string ;
  @ViewChild("listbox1", { static: false }) public listObj1;
  @ViewChild("listbox2", { static: false }) public listObj2;
  public dataA: { [key: string]: Object }[] = [
    { Name: "Australia", Code: "AU" },
    { Name: "Bermuda", Code: "BM" },
    { Name: "Canada", Code: "CA" },
    { Name: "Cameroon", Code: "CM" },
    { Name: "Denmark", Code: "DK" },
    { Name: "France", Code: "FR" },
    { Name: "Finland", Code: "FI" },
    { Name: "Germany", Code: "DE" },
    { Name: "Hong Kong", Code: "HK" }
  ];
  public dataB: { [key: string]: Object }[] = [
    // { Name: "India", Code: "IN" },
    // { Name: "Italy", Code: "IT" },
    // { Name: "Japan", Code: "JP" },
    // { Name: "Mexico", Code: "MX" },
    // { Name: "Norway", Code: "NO" },
    // { Name: "Poland", Code: "PL" },
    // { Name: "Switzerland", Code: "CH" },
    // { Name: "United Kingdom", Code: "GB" },
    // { Name: "United States", Code: "US" }
  ];
  public fields: FieldSettingsModel = {   text: "Name" };
  public toolbarSettings: ToolbarSettingsModel = {
    items: [
      "moveUp",
      "moveDown",
      "moveTo",
      "moveFrom",
      "moveAllTo",
      "moveAllFrom"
    ]
  };
  dataTemp: any = null;
  click() {
    this.dataTemp = this.listObj2.getDataList();
    console.log(this.dataTemp);
    // console.log(this.fileName);
    // console.log(this.file_Type);
    this.dataex = this.dataTemp;
if (this.file_Type == "Excel") {
  this.exportExcel(this.dataTemp)
}
if (this.file_Type == "Xml") {
  this.exportXml(this.dataTemp)
}
  }
  actionBegin(args) {
    
    // console.log(args);
  }
  actionComplete(args) {
    setTimeout(() => {
      this.dataTemp = this.listObj2.getDataList();
      console.log(this.dataTemp);
    }, 50); 
    

    // console.log(args);
  }
  constructor() { }

  ngOnInit(): void {
    console.log(this.fileName )
    console.log(this.file_Type)
    this.initialPage = { pageSizes: true, pageCount: 4 };
    this.data_grid = orderDetails;
    
  }
  public selection = {
    showCheckbox: true,
    showSelectAll: true
     }

     exportExcel(data) {
      import("xlsx").then(xlsx => {
          const worksheet = xlsx.utils.json_to_sheet(data);
          const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
          const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
          this.saveAsExcelFile(excelBuffer);
      });
    }
    
    saveAsExcelFile(buffer: any): void {
      let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.excel';
      const data: Blob = new Blob([buffer], {
          type: EXCEL_TYPE
      });
      // FileSaver.saveAs(data, fileName + '_ex_' + new Date().getTime() + EXCEL_EXTENSION);
      FileSaver.saveAs(data, this.fileName +  EXCEL_EXTENSION);
      this.file_Type= null;
      this.fileName= null;
    }


    exportXml(data) {
      import("xlsx").then(xlsx => {
          const worksheet = xlsx.utils.json_to_sheet(data);
          const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
          const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
          this.saveAsXmlFile(excelBuffer, );
      });
    }
    
    saveAsXmlFile(buffer: any ): void {
      let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
      let EXCEL_EXTENSION = '.xml';
      const data: Blob = new Blob([buffer], {
          type: EXCEL_TYPE
      });
      FileSaver.saveAs(data, this.fileName +   EXCEL_EXTENSION);
      this.file_Type= null;
      this.fileName= null;
    }
}
