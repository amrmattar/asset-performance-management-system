import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { ToastrService } from 'ngx-toastr';
import { TablesRepository } from 'src/app/data/tables.repository';
import { columns } from 'src/models/dataSheetModels/columns';
import { Rows } from 'src/models/dataSheetModels/Rows';
import { section } from 'src/models/dataSheetModels/section';
import { ColumnData } from 'src/models/requests/columnDataRequest';
import { ColumnRequest } from 'src/models/requests/ColumnRequest';
import { SysDatasheetVm } from 'src/models/responses/SysDatasheetVm';
import { TableIds } from 'src/models/responses/systable';
import { DataSheetService } from 'src/services/DataSheetService';
import { TableService } from 'src/services/TableService';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-table-layout-data-sheet',
  templateUrl: './table-layout-data-sheet.component.html',
  styleUrls: ['./table-layout-data-sheet.component.scss'],
  providers:[TableService,DataSheetService]
})
export class TableLayoutDataSheetComponent implements OnInit,OnChanges {
  public config: PerfectScrollbarConfigInterface = {};
  @Input() childMessage: any={id:0,type:"layout"};
  rows: Rows[];
  
  cols: columns[];
  columns:ColumnData[];
  search:string;
  section: section[];
  _dataSheet:SysDatasheetVm;
  ncol:number=0;
  deletedRows:any[];
  currentSection:section;
  draggedColumns:ColumnData;
  constructor(private translateService: TranslateService,private tableRepo: TablesRepository,
              private _tableService:TableService,
              private _DataSheetService:DataSheetService,
              private notifications: NotificationsService,
              private toastr: ToastrService
    ) { 
      this.columns=new Array<ColumnData>();
      this._dataSheet=new SysDatasheetVm();
      this.section=new Array<section>();
      this.rows=new Array;
      this.cols=new Array<columns>();
      this.deletedRows=new Array;
      this.currentSection=new section();
      this.draggedColumns=new ColumnData();
    }
 

  ngOnInit(): void {
  }
  
  ngOnChanges(){
    console.log("__________________",this.childMessage)
    let cR=new ColumnRequest();
    cR.tkey=this.childMessage.tableTkey;
    this.GetAllColumns(cR);
    
  }

  back(){
    this.tableRepo.showTableDataSheet=false;
    this.tableRepo.showinfoDataSheet=false;
    this.tableRepo.showSectionDataSheet=true;
    this.tableRepo.TableLayoutDataSheet=false;
  }

  filter(){
    let cR=new ColumnRequest();
    cR.tkey=this.childMessage.tableTkey;
    cR.search=this.search;
    this.GetAllColumns(cR);
  }
  GetAllColumns(columnRequest:ColumnRequest){
    this._tableService.GetAllColumns(columnRequest).
    subscribe(res=>{
      this.columns=res.data.columnsDataList;
      this.GetDataSheetById(this.childMessage.id );
    })
  }

  sectionTitle:string;
  GetDataSheetById(dsKey:any){
   //  
    this._DataSheetService.GetDataSheetById(dsKey).subscribe(res=>{
       
      this._dataSheet=res.model;
      // console.log("this._dataSheet",this._dataSheet);
      this.section = JSON.parse(this._dataSheet.jsonContent);
    this.currentSection= this.section.find(x=>x.id == this.childMessage.sectionId);
      this.sectionTitle=this.currentSection.title;
      this.rows=this.currentSection.rows;
      console.log("________columns_____",this.columns);
       console.log("________cuurentSection_____",this.currentSection);
      //  this.currentSection.rows.forEach(row => {
      //     
      //   row.cols.forEach(col => {
      //      
      //     this.columns= this.columns.filter(x=>x.columnId != col.columnId);
      //   });
      //  });
      this.section.forEach(element => {
        element.rows.forEach(row => {
              
            row.cols.forEach(col => {
               
              this.columns= this.columns.filter(x=>x.columnId != col.columnId);
            });
           });
      });
    });
  }
  flgeClicked:boolean=true;
  selectSection(){
    this.flgeClicked=false;
  }
  
  AddRow(){
   //  
   
        let dummyRows=[];
       //get elemnt that have greater length of columns
       this.rows.forEach(x => { 
        let lengtOfcolumns=x.cols.length;
        dummyRows.push(lengtOfcolumns);
       
       });
      //  console.log("max columns",dummyRows);
      //  console.log("max columns",Math.max(...dummyRows));
      this.ncol=Math.max(...dummyRows);

    let row=new Rows();
    row.cols=new Array;
    for(let i =0; i< this.ncol; i++){
      row.cols.push(new columns());
    }
    this.rows.push(row);
  }
  AddColumn(){
    if(this.deletedRows.length > 0){
      this.rows.forEach(x=>{
         
        let founded=this.deletedRows.find(i=> i == this.rows.indexOf(x));
        if(founded != null){
          x.cols.push(new columns())
        }
       
      })
    }else{
      //this.ncol++;
      this.rows.forEach(x=>{
         
        x.cols.push(new columns())
      })

    }
    

  }
  save(){
    this.currentSection.title=this.sectionTitle;
    this.currentSection.rows=this.rows;
    this._dataSheet.jsonContent=JSON.stringify(this.section);
    console.log("save db",this._dataSheet);
    this._DataSheetService.UpdateSectionOfDataSheet(this._dataSheet).subscribe(res=>{
      this.toastr.success(this.translateService.instant('table-layout-data-sheet.sectionSavedSuccessfuly'), 'Success');
    })
  }
  onChange(rowIndex,values:any){
   //  
    console.log("rowIndex",rowIndex);
    console.log(values.currentTarget.checked);
    if(values.currentTarget.checked == true){
      this.deletedRows.push(rowIndex);
    }else{
      this.deletedRows = this.deletedRows.filter(x=>x != rowIndex);
    }
    console.log("this.deletedRows",this.deletedRows);
  }

  DeleteRows(){
     
    console.log("this.selectedRow",this.selectedRow);
    let DeletedRow=this.deletedRows.find(x=>x == this.selectedRow);
 
    if(DeletedRow != null){
      this.selectedRow = undefined;
      this.selectedColumn=undefined;
    }

  this.deletedRows.forEach(element => {
    console.log("deleted columns",this.rows[element]);
    this.rows[element].cols.forEach(col => {
      if(col.ckey != undefined){
        this.columns = [...this.columns, col];
      }

    });
  });
  this.rows = this.rows.filter((value, index)=> {
    return this.deletedRows.indexOf(index) == -1;
})
    this.deletedRows=[];
  }

  selectedColumn:any;
  selectedRow:any;
  selectedIndex(irow:any,columnindex:any){
   //  
    this.selectedColumn=columnindex;
    this.selectedRow=irow;
  }

  deleteColumn(){
     
    console.log("rowRel",this.rows[this.selectedRow].cols[this.selectedColumn]);
    if(this.rows[this.selectedRow].cols[this.selectedColumn].ckey != undefined){
      this.columns = [...this.columns, this.rows[this.selectedRow].cols[this.selectedColumn]];
    }

    if(this.selectedColumn != undefined){
      this.rows[this.selectedRow].cols.splice(this.selectedColumn,1);
      this.selectedColumn=undefined;
    }
  }

  dragStart(event, Column: ColumnData) {

    this.draggedColumns = Column;
}

drop(event,rowNumber,columnNumber) {
  let flagExist=false
  console.log("asd",this.draggedColumns.columnCaption);
  console.log(rowNumber,columnNumber);
  
  for (let el of this.rows) {
    let exist=el.cols.find(x=>x.columnCaption == this.draggedColumns.columnCaption);
    if(exist != null){
      this.toastr.warning(this.translateService.instant('table-layout-data-sheet.FieldAlreadyExist'), 'Warnning');
      flagExist=true;
      break;
      
    }
  }
    if(flagExist==false){
      this.columns=this.columns.filter(x=>x.columnCaption != this.draggedColumns.columnCaption);
      let row=this.rows[rowNumber];
      console.log( row)
       
      let oldelement:any=this.rows[rowNumber].cols[columnNumber];
      if(oldelement.ckey > 0){
        this.columns.push(oldelement);
      }

      this.rows[rowNumber].cols[columnNumber]=this.draggedColumns;
    }
    
}

dragEnd(event) {
    this.draggedColumns = null;
   
}

IndexRowBack:any;
IndexColumnBack:any;

dragStartBack(event, Column: ColumnData,irow,icol) {
  this.draggedColumns = Column;
  this.IndexRowBack=irow;
  this.IndexColumnBack=icol;
}

dragEndBack(event) {
  this.draggedColumns = null;
  console.log("dragEnd",this.draggedColumns);

}

dropBack(event){
   
  let columnExists=this.columns.find(x=>x.ckey == this.draggedColumns.ckey)
  if (this.draggedColumns.ckey != null && columnExists == null) 
  {
    this.columns = [...this.columns, this.draggedColumns];
    this.rows[this.IndexRowBack].cols[this.IndexColumnBack]=new columns();
    this.draggedColumns = null;
    this.IndexRowBack=undefined;
    this.IndexColumnBack=undefined;
  }else{
    this.toastr.warning(this.translateService.instant('table-layout-data-sheet.InvalidColumne'), 'Warnning');
  }
}
}
