import { Component, OnInit, OnChanges, SimpleChanges, Input } from '@angular/core';
import { ViewEncapsulation, ViewChild } from '@angular/core';
import { ILoadedEventArgs, ChartComponent, ChartTheme, IMouseEventArgs } from '@syncfusion/ej2-angular-charts';
import { Browser } from '@syncfusion/ej2-base';
import { data } from '../../../../admin/apm-formation/apm-formation-export/data_grid';
import { async } from '@angular/core/testing';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { GraphDataService } from '../../graph-data.service';

@Component({
  selector: 'app-column-graph',
  templateUrl: './column-graph.component.html',
  styleUrls: ['./column-graph.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ColumnGraphComponent implements OnInit, OnChanges {
    @Input() graphmsg: any;
    @ViewChild('dropdown11') public dropdownlist: DropDownListComponent;
    type:string = 'Column';
    selectedSeries:any;
    selectedSeriesColor:any;
    marker:any = '';
    checkStateAxis:boolean = true;
    checkStateMarker:boolean = true;
    public typeDrop: string[] = ['Column', 'StackingColumn', 'Bar', 'StackingBar' ];
    columnWidth:string = '0.8';
    interval:any=20;
    typedropDown:any = 'Column';
    public radius: Object;
    arrayOfName: any=[];
    public headerText: Object = [{ 'text': 'Graph' }, { 'text': 'series' },{ 'text': 'axis' }];
    public previousTarget = null;
    public fullData:any ={
     data: {
            name: "UK",
            color: "red",
            details: [
                { x: '2014', y: 111.1 },
                { x: '2015', y: 127.3 },
                { x: '2016', y: 143.4 },
                { x: '2017', y: 159.9 }
            ]
        },
    data1: {
            name: "Germany",
            color: "green",
            details: [
                { x: '2014', y: 76.9 },
                { x: '2015', y: 99.5 },
                { x: '2016', y: 121.7 },
                { x: '2017', y: 142.5 }
            ]
        },
     data2: {
         name: "France",
         color: "grey",
         details: [
             { x: '2014', y: 66.1 },
             { x: '2015', y: 79.3 },
             { x: '2016', y: 91.3 },
             { x: '2017', y: 102.4 }
         ]
     },
     data3: {
         name: "Italy",
         color: "blue",
         details: [
             { x: '2014', y: 34.1 },
             { x: '2015', y: 38.2 },
             { x: '2016', y: 44.0 },
             { x: '2017', y: 51.6 }
         ]
     },
}
    sharedData: any;

checkBoxChange(args){
    console.log(args);
  }





    //Initializing Primary X Axis
    public primaryXAxis1: Object = {
        title: 'Year',
        majorGridLines: { width: 0 },
        minorGridLines: { width: 0 },
        majorTickLines: { width: 0 },
        minorTickLines: { width: 0 },
        interval: 1,
        lineStyle: { width: 0 },
        labelIntersectAction: 'Rotate45',
        valueType: 'Category'
    };
    //Initializing Primary Y Axis
    public primaryYAxis1: Object = {
        title: 'Sales',
        lineStyle: { width: 0 },
        majorTickLines: { width: 0 },
        majorGridLines: { width: 1 },
        minorGridLines: { width: 1 },
        minorTickLines: { width: 0 },
        interval: this.interval,
        labelFormat: '{value}B',
    };
    
    public primaryXAxis2: Object = {
        valueType: 'Category', 
        interval: 1, 
        majorGridLines: { width: 0 }
    };
    //Initializing Primary Y Axis
    public primaryYAxis2: Object = {
        majorGridLines: { width: 0 },
        majorTickLines: { width: 0 }, 
        lineStyle: { width: 0 }, 
        labelStyle: { color: 'transparent' }
    };
    
    primaryXAxis:any = this.primaryXAxis1;
    primaryYAxis:any = this.primaryYAxis1;
    
    
    public exist: Object = {
        dataLabel: { 
            visible: true, 
            position: 'Top', 
            font: { 
                fontWeight: '600', 
                color: '#ffffff' 
            } 
        } 
    }
    
    
    
    public tooltip: Object = {
        enable: true
    };
    proxy: DropDownListComponent;
     // custom code start
    public load(args: ILoadedEventArgs): void {
        let selectedTheme: string = location.hash.split('/')[1];
        selectedTheme = selectedTheme ? selectedTheme : 'Material';
        args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
    };
     // custom code end
    public title: string = 'Mobile Game Market by Country';
    public chartArea: Object = {
        border: {
            width: 0
        }
    };
    
    constructor(private messagesService: GraphDataService) {
        this.arrayOfName=new Array;
        //code
    }
    ngOnChanges(changes: SimpleChanges): void {
        console.log(this.graphmsg);
        setTimeout(() => {
            this.chartcolumn.refresh();
        }, 50); 
    }

    @ViewChild('chartcolumn')
public chartcolumn: ChartComponent;
    changeShapes(){
        this.chartcolumn.refresh();
        console.log("typedropDown",this.typedropDown);
        this.type=null;
        this.type=this.typedropDown;
        setTimeout(() => {
            this.chartcolumn.refresh();
          }, 50); 
        
    
    } 
    changeSeries(){
        // console.log("series",this.selectedSeries);
        
    }
    changeinterval(){
        // this.interval=asd;
        this.primaryYAxis1 = {
            title: 'Sales',
            lineStyle: { width: 0 },
            majorTickLines: { width: 0 },
            majorGridLines: { width: 1 },
            minorGridLines: { width: 1 },
            minorTickLines: { width: 0 },
            interval: this.interval,
            labelFormat: '{value}B',
        };
    

    if(this.checkStateMarker == false){
        this.marker= this.exist;
    }
    
        this.primaryXAxis = this.primaryXAxis1;
        this.primaryYAxis = this.primaryYAxis1;
    
        setTimeout(() => {
            this.chartcolumn.refresh();
        }, 50); 
    }
    
    changeSeriesColor(){
        Object.keys(this.fullData).forEach(key => {
            if(this.fullData[key].name == this.selectedSeries){
                this.fullData[key].color= this.selectedSeriesColor;
            }
        });
    }

    public chartMouseClick(args: IMouseEventArgs): void {
    //     var flag = false;
    //  if (((args.target).indexOf('chart_legend_text') > -1) || ((args.target).indexOf('chart_legend_shape') > -1) ||
    //    (args.target).indexOf('chart_legend_shape_marker_') && !(args.target).indexOf('chart_legend_element')) {
    //    var ids = ((args.target).indexOf('chart_legend_text') > -1) ?
    //      (args.target).split('chart_legend_text_')[1] : args.target.split('chart_legend_shape_marker_')[1] || args.target.split('chart_legend_shape_')[1];
    //    for (var i = 0; i < this.chartcolumn.series.length; i++) {
    //      this.chartcolumn.series[i].visible = false;
    //    }
    //    if (ids == this.previousTarget) {
    //      for (var j = 0; j < this.chartcolumn.series.length; j++)
    //        this.chartcolumn.series[j].visible = true;
    //      this.chartcolumn.series[ids].visible = false;
    //      this.previousTarget = null;
    //      flag = true;
    //    }
    //    if (!flag)
    //      this.previousTarget = ids;
    //  }

    console.log(args.target)
    };


    ngOnInit(): void {
        this.messagesService.sharedData$.subscribe(sharedData => this.sharedData = sharedData);
        this.radius={ bottomLeft: 0, bottomRight: 0, topLeft: 4, topRight: 4 };
        Object.keys(this.fullData).forEach(key => {
            this.arrayOfName.push(this.fullData[key].name)
        });
    }
    refresh(){
        setTimeout(() => {
            this.chartcolumn.refresh();
        }, 50); 
    }


    add() {
        this.chartcolumn.addSeries([{
        type: 'Column',
        dataSource: [
            { x: 'John', y: 11000 }, 
            { x: 'Jake', y: 16000 }, 
            { x: 'Peter', y: 19000 },
            { x: 'James', y: 12000 }, 
            { x: 'Mary', y: 10700 }],
        xName: 'x', width: 2,
        yName: 'y'
    }]);
}



remove(name) {
    this.chartcolumn.removeSeries(name);
    this.arrayOfName.splice(this.arrayOfName.findIndex(x=>x==name),1);
    // this.dropdownlist.refresh();
    console.log(this.dropdownlist)
    this.proxy = this.dropdownlist
    this.proxy.dataSource = null ;
    this.proxy.dataSource = this.arrayOfName;
    this.proxy.dataBind();
}
}
