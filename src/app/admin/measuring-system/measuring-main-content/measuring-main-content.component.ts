
import { Component, OnInit, ViewChild } from '@angular/core';
import { DialogEditEventArgs, SaveEventArgs, EditSettingsModel, ToolbarItems } from '@syncfusion/ej2-angular-grids';
import { DataUtil } from '@syncfusion/ej2-data';
import { FormGroup } from '@angular/forms';
import { UOMService } from 'src/services/UOMService';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { UomcSetsData } from 'src/models/responses/uomcSetsDataResponse';
@Component({
  selector: 'app-measuring-main-content',
  templateUrl: './measuring-main-content.component.html',
  styleUrls: ['./measuring-main-content.component.scss']
})
export class MeasuringMainContentComponent implements OnInit {

  constructor(private UOMServ:UOMService,private translateService: TranslateService,private toastr: ToastrService) { }
  public editSettings: EditSettingsModel;
  public toolbar: ToolbarItems[];
  public SetRequest: UomcSetsData;
  public pageSettings: Object;
  AllSets:any[];
  @ViewChild('SetForm') public SetForm: FormGroup;

  ngOnInit(): void {
    this.editSettings = { allowEditing: true, allowAdding: true, allowDeleting: true, mode: 'Dialog' ,showDeleteConfirmDialog:true };
    this.toolbar = ['Add', 'Edit', 'Delete'];
    this.pageSettings = { pageCount: 10 };

    this.UOMServ.GetAllUOMSets().subscribe((res)=>{
      if(res.success){
        this.AllSets = res.model;
        this.UOMServ.SetsList = res.model;
      }
      
    });
  }
  actionBegin(args: SaveEventArgs): void {
    if (args.requestType === 'beginEdit' || args.requestType === 'add') {
      
        this.SetRequest = Object.assign({}, args.rowData);
        this.UOMServ.SetRequest = this.SetRequest ;
    }
    if (args.requestType === 'save')
     {
      var IsPresent = this.AllSets.find(a=>a.umcsId==this.SetRequest.umcsId && a.uomkey != this.SetRequest.uomkey )
      if (IsPresent != null) 
      { 
          args.cancel = true;   
          this.toastr.error(this.translateService.instant('set.RepeteData'), 'Error');
          return;
      } else 
      { 
        // this.AllSets.push(this.SetRequest); // insert the record into your datasource 
        if (this.SetForm.valid) {
          args.data = this.SetRequest;
        } else {
          args.cancel = true;
          return;
      }
      } 
        this.UOMServ.SaveSet().subscribe(
          (res)=>{

            if(res.model==true ){
              this.toastr.success(this.translateService.instant('set.AddSuccess'), 'Success');
            }
            else{
              this.toastr.error(this.translateService.instant('set.AddFailed'), 'Error');
            }
          });       
    }

    if (args.requestType === 'delete') {
      this.SetRequest = Object.assign({}, args.data[0]);
      this.UOMServ.SetRequest = this.SetRequest ;
      this.UOMServ.DeleteSet().subscribe(
        (res)=>{
          if(res.model==true ){
            this.toastr.success(this.translateService.instant('set.DeleteSuccess'), 'Success');
          }
          else{
            this.toastr.error(this.translateService.instant('set.DeleteFailed'), 'Error');
          }
          
        });
}

}

actionComplete(args: DialogEditEventArgs): void {
    if ((args.requestType === 'beginEdit' || args.requestType === 'add')) {
      this.UOMServ.SetRequest = this.SetRequest ;
        args.form.ej2_instances[0].rules = {};
        var dialog = args.dialog; 
        dialog.width = 658; 
        if (args.requestType === 'beginEdit') {
            (args.form.elements.namedItem('UmcsId') as HTMLInputElement).focus();
        }
    }
   
}
}