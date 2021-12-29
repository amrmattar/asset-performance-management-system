import { Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild, ViewEncapsulation } from '@angular/core';
import { ILoadedEventArgs, ChartTheme, IMouseEventArgs, ChartComponent } from '@syncfusion/ej2-angular-charts';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { Browser } from '@syncfusion/ej2-base';
import { GraphDataService } from '../../graph-data.service';

@Component({
  selector: 'app-line-graph',
  templateUrl: './line-graph.component.html',
  styleUrls: ['./line-graph.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LineGraphComponent implements OnInit, OnChanges {
    @Input() graphmsg: any;
    type:string = 'Line';
    selectedSeries:any;
    selectedSeriesColor:any;
    arrayOfName: any=[];
    interval:any=20;
    public dropdownlist: DropDownListComponent;
    public typeDrop: string[] = ['Line', 'Area', 'StackingArea' ];
    typedropDown:any = 'Line';
    public headerText: Object = [{ 'text': 'Graph' }, { 'text': 'series' },{ 'text': 'axis' }];
    public fullData:any ={
    data: {
           name: "Germany",
           color: "blue",
           details: [
            { x: new Date(2005, 0, 1), y: 21 }, { x: new Date(2006, 0, 1), y: 24 },
            { x: new Date(2007, 0, 1), y: 36 }, { x: new Date(2008, 0, 1), y: 38 },
            { x: new Date(2009, 0, 1), y: 54 }, { x: new Date(2010, 0, 1), y: 57 },
            { x: new Date(2011, 0, 1), y: 70 }
           ]
       },
    data1: {
           name: "England",
           color: "green",
           details: [
            { x: new Date(2005, 0, 1), y: 28 }, { x: new Date(2006, 0, 1), y: 44 },
            { x: new Date(2007, 0, 1), y: 48 }, { x: new Date(2008, 0, 1), y: 50 },
            { x: new Date(2009, 0, 1), y: 66 }, { x: new Date(2010, 0, 1), y: 78 }, { x: new Date(2011, 0, 1), y: 84 }
           ]
       },
}
//Initializing Primary X Axis
public primaryXAxis: Object = {
    valueType: 'DateTime',
    labelFormat: 'y',
    intervalType: 'Years',
    edgeLabelPlacement: 'Shift',
    majorGridLines: { width: 0 }
};
//Initializing Primary Y Axis
public primaryYAxis: Object = {
    labelFormat: '{value}%',
    rangePadding: 'None',
    minimum: 0,
    maximum: 100,
    interval: this.interval,
    lineStyle: { width: 0 },
    majorTickLines: { width: 0 },
    minorTickLines: { width: 0 }
};
public chartArea: Object = {
    border: {
        width: 0
    }
};
public width: string = Browser.isDevice ? '100%' : '60%';
public marker: Object = {
    visible: true,
    height: 10,
    width: 10
};
public tooltip: Object = {
    enable: true
};
    sharedData: any;
// custom code start
public load(args: ILoadedEventArgs): void {
    let selectedTheme: string = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'Material';
    args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");
};
// custom code end
public title: string = 'Inflation - Consumer Price';
constructor(private messagesService: GraphDataService) {
    this.arrayOfName=new Array;
   //code
}
ngOnChanges(changes: SimpleChanges): void {
    // console.log(this.graphmsg);
    setTimeout(() => {
        this.chartline.refresh();
    }, 50); 
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
    @ViewChild('chartline') public chartline: ChartComponent;
        changeShapes(){
            this.chartline.refresh();
            console.log("typedropDown",this.typedropDown);
            this.type=null;
            this.type=this.typedropDown;
            setTimeout(() => {
                this.chartline.refresh();
              }, 50); 
        } 
        changeSeriesColor(){
            Object.keys(this.fullData).forEach(key => {
                if(this.fullData[key].name == this.selectedSeries){
                    this.fullData[key].color= this.selectedSeriesColor;
                }
            });
        }
        changeinterval(){
            // this.interval=asd;
            this.primaryYAxis = {
                labelFormat: '{value}%',
                rangePadding: 'None',
                minimum: 0,
                maximum: 100,
                interval: this.interval,
                lineStyle: { width: 0 },
                majorTickLines: { width: 0 },
                minorTickLines: { width: 0 }
            };
        
    
        // if(this.checkStateMarker == false){
        //     this.marker= this.exist;
        // }
        
            // this.primaryXAxis = this.primaryXAxis1;
            // this.primaryYAxis = this.primaryYAxis1;
        
            setTimeout(() => {
                this.chartline.refresh();
            }, 50); 
        }
        proxy: DropDownListComponent;
        remove(name) {
            this.chartline.removeSeries(name);
            this.arrayOfName.splice(this.arrayOfName.findIndex(x=>x==name),1);
            this.proxy = this.dropdownlist; 
            this.proxy.dataSource = null;
            this.proxy.dataSource = this.arrayOfName;
            this.proxy.dataBind();
        }
ngOnInit(): void {
    this.messagesService.sharedData$.subscribe(sharedData => this.sharedData = sharedData);
    Object.keys(this.fullData).forEach(key => {
        this.arrayOfName.push(this.fullData[key].name)
    });
}

}
