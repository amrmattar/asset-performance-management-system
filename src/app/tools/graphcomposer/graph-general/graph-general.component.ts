import { Component, EventEmitter, OnInit, Output, ViewChild, ViewEncapsulation } from '@angular/core';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { EmitType } from '@syncfusion/ej2-base';
import { SelectionService, GridComponent, RowSelectEventArgs } from '@syncfusion/ej2-angular-grids';
import { TabService } from 'src/services/tab.service';
import { ActivatedRoute } from '@angular/router';
import { Tab } from '../../../../models/tab.model';
import { GraphDataService } from '../graph-data.service';
@Component({
  selector: 'app-graph-general',
  templateUrl: './graph-general.component.html',
  styleUrls: ['./graph-general.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GraphGeneralComponent implements OnInit {
    @Output() GraphGeneralMessage = new EventEmitter<any>();
    graphName:string='';
    graphDesc:string='';
    graphURL:string='';
    public targetElement: HTMLElement;
    public hidden: Boolean = false;
    public data: Object[];
    public selectOptions: Object;
    sub:any;
    id:any;
    graphTabs:Tab[]=[];
public focusIn(target: HTMLElement): void {
    let parent: HTMLElement = target.parentElement;
    if (parent.classList.contains('e-input-in-wrap')) {
        parent.parentElement.classList.add('e-input-focus');
    } else {
        parent.classList.add('e-input-focus');
    }
}

public focusOut(target: HTMLElement): void {
    let parent: HTMLElement = target.parentElement;
    if (parent.classList.contains('e-input-in-wrap')) {
        parent.parentElement.classList.remove('e-input-focus');
    } else {
        parent.classList.remove('e-input-focus');
    }
}

public onMouseDown(target: HTMLElement): void {
    target.classList.add('e-input-btn-ripple');
}

public onMouseUp(target: HTMLElement): void {
    let ele: HTMLElement = target;
    setTimeout(
            () => {ele.classList.remove('e-input-btn-ripple'); },
            500);
}

    constructor(private _tabService: TabService,private messagesService: GraphDataService,
        private activatedRoute: ActivatedRoute) { }

    ngOnInit(): void {
        
        this.selectOptions = { persistSelection: true };

        //---------------------------------------------------------------------
  
        this.sub = this.activatedRoute
        .queryParams
        .subscribe(params => {
            this.id=params['s'];
          }
        );
        // debugger;
        this.graphTabs.forEach(element => {
             debugger;
           let item= this._tabService.tabs.find(x=>x.id == element.id);
           item.name=element.name;
        });
        //---------------------------------------------------------------------
    }

@ViewChild('ejDialog1') ejDialog1: DialogComponent;
public onOpenDialog1 = function (event: any): void {
    // Call the show method to open the Dialog
    this.ejDialog1.show();
}
public hideDialog: EmitType<object> = () => {
    this.ejDialog1.hide();
}
public onOverlayClick: EmitType<object> = () => {
    this.ejDialog1.hide();
}



@ViewChild('grid')
public grid: GridComponent;
rowSelected(args: RowSelectEventArgs) {
    const selectedrowindex: number[] = this.grid.getSelectedRowIndexes();  // Get the selected row indexes.
    // alert(selectedrowindex); // To alert the selected row indexes.
    const selectedrecords: object[] = this.grid.getSelectedRecords();
    // console.log(selectedrecords)  // Get the selected records.
    this.messagesService.setHelloMessage(selectedrecords);
}



loadData(name,desc,url,key){
     debugger;
    // console.log("tabs",this._tabService.tabs);
    let Graphtab:any={id:this.id,name:name,url:key};
    this.graphTabs.push(Graphtab);
    let tab = this._tabService.tabs.find(x=>x.id == this.id);
    tab.name=name;
    this.GraphGeneralMessage.emit(name)
    this.data = [
        { Caption: 'Countries', Alies: 'VINET', EmployeeID: 5 },
        { Caption: 'Sales', Alies: 'VINET', EmployeeID: 5 },
        { Caption: 'Browser States', Alies: 'VINET', EmployeeID: 5 },
        { Caption: 'Weather', Alies: 'VINET', EmployeeID: 5 },
        { Caption: 'Year', Alies: 'VINET', EmployeeID: 5 },
        { Caption: 'heat Calender', Alies: 'VINET', EmployeeID: 5 },
        { Caption: 'profit', Alies: 'VINET', EmployeeID: 5 },
        { Caption: 'date', Alies: 'VINET', EmployeeID: 5 },
        { Caption: 'height', Alies: 'VINET', EmployeeID: 5 },
        { Caption: 'weight', Alies: 'VINET', EmployeeID: 5 },
    ];
    this.graphName = name;
    this.graphDesc = desc;
    this.graphURL = url;
    this.ejDialog1.hide();
}

}
