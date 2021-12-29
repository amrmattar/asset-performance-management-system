import { Component, OnInit } from '@angular/core';
import {  ViewEncapsulation, ViewChild } from '@angular/core';
import { orderDetails } from './data';
import { FreezeService, ResizeService } from '@syncfusion/ej2-angular-grids';
import { NumericTextBoxComponent } from '@syncfusion/ej2-angular-inputs';
import { GroupService, SortService, GridComponent } from '@syncfusion/ej2-angular-grids';
import {  PageService, EditService, ExcelExportService, PdfExportService, ContextMenuService } from '@syncfusion/ej2-angular-grids';
import { Browser } from '@syncfusion/ej2-base';
import {  FilterService, FilterType  } from '@syncfusion/ej2-angular-grids';
import { ContextMenuItem, GroupSettingsModel, EditSettingsModel } from '@syncfusion/ej2-angular-grids';
import { ToolbarService, ColumnChooserService } from '@syncfusion/ej2-angular-grids';
import { ClickEventArgs } from '@syncfusion/ej2-navigations';
import { EmitType } from '@syncfusion/ej2-base';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
@Component({
  selector: 'app-querycomposer-results',
  templateUrl: './querycomposer-results.component.html',
  styleUrls: ['./querycomposer-results.component.scss'],
  providers: [GroupService, SortService, ResizeService,ColumnChooserService, PageService, EditService, ExcelExportService, PdfExportService, ContextMenuService,FilterService,ToolbarService],
  encapsulation: ViewEncapsulation.None
})
export class QuerycomposerResultsComponent implements OnInit {
  public groupOptions: Object;
    public pageSettings: Object;
    public refresh: Boolean;
    public hidden: Boolean = false;
    public target: string = '.control-section';
    public showCloseIcon: Boolean = false;
    public animationSettings: Object = { effect: 'None' };
    public contextMenuItems: ContextMenuItem[];
    public editing: EditSettingsModel;
    public targetElement: HTMLElement;
    public filterSettings: Object;
    public pageSizes: number[] = [5, 10, 15 , 20]; 
    public formatoptions: Object;
    public toolbar: any[];
  constructor() { 
  }
  @ViewChild('ejDialog5') ejDialog5: DialogComponent;
  @ViewChild('grid')
    public grid: GridComponent;
    @ViewChild('rows')
    public rows: NumericTextBoxComponent;
    @ViewChild('columns')
    public columns: NumericTextBoxComponent;
    public data: Object[] = [];
    columnValue: number = Browser.isDevice ? 1 : 2;
    //After clicking 'Set' button, the `frozenRows` and `frozenColumns` values will be updated in Grid.
    btnClick() {
        this.grid.frozenRows = this.rows.value;
        this.grid.frozenColumns = this.columns.value;
        this.ejDialog5.hide();
    }

    ngOnInit(): void {
        this.data = orderDetails;
        // this.data = inventoryData;
        this.pageSettings = { pageCount: 10, pageSize: this.pageSizes[3], pageSizes: this.pageSizes  };
        this.contextMenuItems = ['SortAscending', 'SortDescending',
        'Save', 'Cancel',
        'FirstPage', 'PrevPage',
        'LastPage', 'NextPage', 'Group'];
        this.editing = { allowDeleting: true, allowEditing: true };
        this.filterSettings = { type: 'Menu' };
        this.formatoptions = { type: 'dateTime', format: 'M/d/y hh:mm a' };
        this.toolbar = ['ExcelExport',{ type: 'Separator' }, 'PdfExport',{ type: 'Separator' },'ColumnChooser',{ text: 'Frozen', tooltipText: 'Frozen', prefixIcon: 'e-Column_chooser', id: 'Frozen' }];
    }
    dataBound() {
      if(this.refresh){
          this.grid.groupColumn('Country');
          this.refresh =false;
      }
  }
  load() {
      this.refresh = (<any>this.grid).refreshing;
  }
  toolbarClick(args: ClickEventArgs): void {
    if (args.item.id === 'Frozen') {
      this.onOpenDialog5(args);
    }
    switch (args.item.text) {
        /* tslint:disable */
        case 'Excel Export':
            this.grid.excelExport(this.getExcelExportProperties());
            break;
        /* tslint:enable */
        case 'PDF Export':
            this.grid.pdfExport(this.getPdfExportProperties());
            break;
    }
}
public onOpenDialog5 = function (event: any): void {
  this.ejDialog5.show();
}
public onOverlayClick: EmitType<object> = () => {
  this.ejDialog5.hide();

  }
private getDate(): string {
    let date: string = '';
    date += ((new Date()).getMonth().toString()) + '/' + ((new Date()).getDate().toString());
    return date += '/' + ((new Date()).getFullYear().toString());
}
private getExcelExportProperties(): any {
    return {
        header: {
            headerRows: 7,
            rows: [
                {
                    index: 1,
                    cells: [
                        /* tslint:disable-next-line:max-line-length */
                        { index: 1, colSpan: 5, value: 'INVOICE', style: { fontColor: '#C25050', fontSize: 25, hAlign: 'Center', bold: true } }
                    ]
                },
                {
                    index: 3,
                    cells: [
                        /* tslint:disable-next-line:max-line-length */
                        { index: 1, colSpan: 2, value: 'Adventure Traders', style: { fontColor: '#C67878', fontSize: 15, bold: true } },
                        { index: 4, value: 'INVOICE NUMBER', style: { fontColor: '#C67878', bold: true } },
                        { index: 5, value: 'DATE', style: { fontColor: '#C67878', bold: true }, width: 150 }
                    ]
                },
                {
                    index: 4,
                    cells: [
                        { index: 1, colSpan: 2, value: '2501 Aerial Center Parkway' },
                        { index: 4, value: 2034 },
                        { index: 5, value: this.getDate(), width: 150 }
                    ]
                },
                {
                    index: 5,
                    cells: [
                        { index: 1, colSpan: 2, value: 'Tel +1 888.936.8638 Fax +1 919.573.0306' },
                        { index: 4, value: 'CUSOTMER ID', style: { fontColor: '#C67878', bold: true } },
                        { index: 5, value: 'TERMS', width: 150, style: { fontColor: '#C67878', bold: true } }
                    ]
                },
                {
                    index: 6,
                    cells: [
                        { index: 4, value: 564 },
                        { index: 5, value: 'Net 30 days', width: 150 }
                    ]
                }
            ]
        },

        footer: {
            footerRows: 5,
            rows: [
                /* tslint:disable-next-line:max-line-length */
                { cells: [{ colSpan: 6, value: 'Thank you for your business!', style: { fontColor: '#C67878', hAlign: 'Center', bold: true } }] },
                { cells: [{ colSpan: 6, value: '!Visit Again!', style: { fontColor: '#C67878', hAlign: 'Center', bold: true } }] }
            ]
        },
        
        fileName: "exceldocument.xlsx"
    };
}
private getPdfExportProperties(): any {
    return {
        header: {
            fromTop: 0,
            height: 120,
            contents: [
                {
                    type: 'Text',
                    value: 'INVOICE',
                    position: { x: 280, y: 0 },
                    style: { textBrushColor: '#C25050', fontSize: 25 },
                },
                {
                    type: 'Text',
                    value: 'INVOICE NUMBER',
                    position: { x: 500, y: 30 },
                    style: { textBrushColor: '#C67878', fontSize: 10 },
                },
                {
                    type: 'Text',
                    value: 'Date',
                    position: { x: 600, y: 30 },
                    style: { textBrushColor: '#C67878', fontSize: 10 },
                }, {
                    type: 'Text',
                    value: '223344',
                    position: { x: 500, y: 50 },
                    style: { textBrushColor: '#000000', fontSize: 10 },
                },
                {
                    type: 'Text',
                    value: this.getDate(),
                    position: { x: 600, y: 50 },
                    style: { textBrushColor: '#000000', fontSize: 10 },
                },
                {
                    type: 'Text',
                    value: 'CUSTOMER ID',
                    position: { x: 500, y: 70 },
                    style: { textBrushColor: '#C67878', fontSize: 10 },
                },
                {
                    type: 'Text',
                    value: 'TERMS',
                    position: { x: 600, y: 70 },
                    style: { textBrushColor: '#C67878', fontSize: 10 },
                }, {
                    type: 'Text',
                    value: '223',
                    position: { x: 500, y: 90 },
                    style: { textBrushColor: '#000000', fontSize: 10 },
                },
                {
                    type: 'Text',
                    value: 'Net 30 days',
                    position: { x: 600, y: 90 },
                    style: { textBrushColor: '#000000', fontSize: 10 },
                },
                {
                    type: 'Text',
                    value: 'Adventure Traders',
                    position: { x: 20, y: 30 },
                    style: { textBrushColor: '#C67878', fontSize: 20 }
                },
                {
                    type: 'Text',
                    value: '2501 Aerial Center Parkway',
                    position: { x: 20, y: 65 },
                    style: { textBrushColor: '#000000', fontSize: 11 }
                },
                {
                    type: 'Text',
                    value: 'Tel +1 888.936.8638 Fax +1 919.573.0306',
                    position: { x: 20, y: 80 },
                    style: { textBrushColor: '#000000', fontSize: 11 }
                },
            ]
        },
        footer: {
            fromBottom: 160,
            height: 100,
            contents: [
                {
                    type: 'Text',
                    value: 'Thank you for your business !',
                    position: { x: 250, y: 20 },
                    style: { textBrushColor: '#C67878', fontSize: 14 }
                },
                {
                    type: 'Text',
                    value: '! Visit Again !',
                    position: { x: 300, y: 45 },
                    style: { textBrushColor: '#C67878', fontSize: 14 }
                }
            ]
        },
        
        fileName: "pdfdocument.pdf"
    };
}

}
