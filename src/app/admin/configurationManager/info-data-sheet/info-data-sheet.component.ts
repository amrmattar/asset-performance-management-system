import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { ToastrService } from 'ngx-toastr';
import { TablesRepository } from 'src/app/data/tables.repository';
import { Rows } from 'src/models/dataSheetModels/Rows';
import { section } from 'src/models/dataSheetModels/section';
import { SysDatasheetVm } from 'src/models/responses/SysDatasheetVm';
import { DataSheetService } from 'src/services/DataSheetService';
declare var hideModal:any;
@Component({
  selector: 'app-info-data-sheet',
  templateUrl: './info-data-sheet.component.html',
  styleUrls: ['./info-data-sheet.component.scss'],
  providers:[DataSheetService]
})
export class InfoDataSheetComponent implements OnInit {
  flagBack: boolean = false;
  @Output() FlagEvent = new EventEmitter<boolean>();
  @Input() childMessage: any={id:0,type:"layout"};
  section: section[];
  _dataSheet:SysDatasheetVm;
  constructor(private translateService: TranslateService,private tableRepo: TablesRepository,
              private _DataSheetService:DataSheetService,
              private notifications: NotificationsService,
              private toastr: ToastrService) {
    this._dataSheet=new SysDatasheetVm();
    this.section=new Array<section>();
   }
  
  ngOnInit(): void {
   
  }
  ngOnChanges() {
    if(this.childMessage.id > 0){
      this.GetDataSheetById(this.childMessage.id );
    }else{
      this._dataSheet.isDefault=true;
    }
  }
  back(){
    this.tableRepo.showTableDataSheet=true;
    this.tableRepo.showinfoDataSheet=false;
    this.sendMessage();
  }
 
  saveDataSheet(){
    if(this.childMessage.id == 0){
      this.addNew();
    }else{
      this.update();
    }
  
  }

  addNew(){
    this.AddfirstSection();
    this._dataSheet.jsonContent= JSON.stringify(this.section);
    this._dataSheet.isCustomLayout=false;
    this._dataSheet.tableKey=this.childMessage.tableTkey;
    this._DataSheetService.SaveDataSheet(this._dataSheet).subscribe(res=>{
      this.tableRepo.showTableDataSheet=true;
      this.tableRepo.showinfoDataSheet=false;
      this.toastr.success(this.translateService.instant('datasheet.DataSheetAddedSuccessfly'), 'Success');
    });
  }

  update(){
    this._dataSheet.isCustomLayout=false;
    this._dataSheet.tableKey=this.childMessage.tableTkey;
    this._DataSheetService.UpdateDataSheet(this._dataSheet).subscribe(res=>{
      this.tableRepo.showTableDataSheet=true;
      this.tableRepo.showinfoDataSheet=false;
      this.toastr.success(this.translateService.instant('datasheet.DataSheetAddedSuccessfly'), 'Success');
    });
  }
    
  AddfirstSection(){
    let sec:section=new section();
    sec.id=1;
    sec.title="new Section";
    sec.rows=new Array<Rows>();
    this.section.push(sec);

  }
  
  updateAndNext(){
     
    this._dataSheet.isCustomLayout=false;
    this._dataSheet.tableKey=this.childMessage.tableTkey;
    this._DataSheetService.UpdateDataSheet(this._dataSheet).subscribe(res=>{
        this.tableRepo.showTableDataSheet=false;
        this.tableRepo.showinfoDataSheet=false;
        this.tableRepo.showSectionDataSheet=true;
        this.toastr.success(this.translateService.instant('datasheet.DataSheetUpdatedSuccessfly'), 'Success');
      });
  }
  // editSection(){
  //   this.tableRepo.showinfoDataSheet=false;
  //   this.tableRepo.showSectionDataSheet=true;
  //     this.updateAndNext();
  // }

  sendMessage() {
     
    this.flagBack=!this.flagBack;
    this.FlagEvent.emit(this.flagBack)
  }
  
  GetDataSheetById(dsKey:any){
    this._DataSheetService.GetDataSheetById(dsKey).subscribe(res=>{
      this._dataSheet=res.model
    });
  }

  DeleteDataSheet() {
     this._DataSheetService.DeleteDataSheet(this._dataSheet.dskey).subscribe(res=>{
        this.tableRepo.showTableDataSheet=true;
        this.tableRepo.showinfoDataSheet=false;
         hideModal("deleteDataSheet");
        this.toastr.success("DataSheet deleted successfly", 'Success');
        this.toastr.success(this.translateService.instant('datasheet.DataSheetDeletedSuccessfly'), 'Success');
      })
    
  }
  
}
