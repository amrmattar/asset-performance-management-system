import { Component, ViewEncapsulation, ViewChild, OnInit, OnChanges, Input, SimpleChanges } from '@angular/core';
import { ILoadedEventArgs, ChartComponent, ChartTheme } from '@syncfusion/ej2-angular-charts';
import { ChartSeriesType } from '@syncfusion/ej2-charts';
import { DropDownList } from '@syncfusion/ej2-dropdowns';
import { Browser } from '@syncfusion/ej2-base';
import { DropDownListComponent } from '@syncfusion/ej2-angular-dropdowns';
import { GraphDataService } from '../../graph-data.service';
@Component({
  selector: 'app-radar-graph',
  templateUrl: './radar-graph.component.html',
  styleUrls: ['./radar-graph.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class RadarGraphComponent implements OnInit, OnChanges {
    @Input() graphmsg: any;
    public dropdownlist: DropDownListComponent;
    type:string = 'Polar';
    drawType:string = 'Line';
    selectedSeries:any;
    selectedSeriesColor:any;
    arrayOfName: any=[];
    public typeDrop: string[] = ['Polar', 'Radar' ];
    public drawTypeDrop: string[] = ['Line', 'Area', 'StackingArea' ];
    typedropDown:any = 'Polar';
    drawTypedropDown:any = 'Line';
public headerText: Object = [{ 'text': 'Graph' }, { 'text': 'series' },{ 'text': 'axis' }];
  public data: Object[] = [
    
];
public data1: Object[] = [
    
];

public fullData:any ={
    data: {
           name: "Germany",
           color: "blue",
           details: [
            { x: 'Jan', y: -7.1 }, { x: 'Feb', y: -3.7 },
    { x: 'Mar', y: 0.8 }, { x: 'Apr', y: 6.3 },
    { x: 'May', y: 13.3 }, { x: 'Jun', y: 18.0 },
    { x: 'Jul', y: 19.8 }, { x: 'Aug', y: 18.1 },
    { x: 'Sep', y: 13.1 }, { x: 'Oct', y: 4.1 },
    { x: 'Nov', y: -3.8 }, { x: 'Dec', y: -6.8 },
           ]
       },
    data1: {
           name: "England",
           color: "green",
           details: [
            { x: 'Jan', y: -17.4 }, { x: 'Feb', y: -15.6 },
    { x: 'Mar', y: -12.3 }, { x: 'Apr', y: -5.3 },
    { x: 'May', y: 1.0 }, { x: 'Jun', y: 6.9 },
    { x: 'Jul', y: 9.4 }, { x: 'Aug', y: 7.6 },
    { x: 'Sep', y: 2.6 }, { x: 'Oct', y: -4.9 },
    { x: 'Nov', y: -13.4 }, { x: 'Dec', y: -16.4 },
           ]
       },
}
//Initializing Primary X Axis
public primaryXAxis: Object = {
    title: 'Months',
    valueType: 'Category',
    labelPlacement: 'OnTicks',
    interval: 1,
    coefficient: Browser.isDevice ? 80 : 100

};
//Initializing Primary Y Axis
public primaryYAxis: Object = {
    title: 'Temperature (Celsius)',
    minimum: -25,
    maximum: 25,
    interval: 10,
    edgeLabelPlacement: 'Shift',
    labelFormat: '{value}°C'
};
public marker: Object = {
    visible: true,
    height: 3, width: 3,
    shape: 'Pentagon',
};
public marker1: Object = {
    visible: true, height: 3, width: 3, shape: 'Diamond'
};
    sharedData: any;
  // custom code start
public load(args: ILoadedEventArgs): void {
    let selectedTheme: string = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'Material';
    args.chart.theme = <ChartTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1)).replace(/-dark/i, "Dark");

};
  // custom code end
public tooltip: Object = {
    enable: true
};
public title: string = 'Alaska Weather Statistics - 2016';
@ViewChild('chartradar')
public chart: ChartComponent;
public isClosed(e: Event): void {
    let element: HTMLInputElement = <HTMLInputElement>e.target;
    this.chart.series[0].isClosed = element.checked;
    this.chart.series[1].isClosed = element.checked;
    this.chart.refresh();
}
public isInversed(e: Event): void {
    let element: HTMLInputElement = <HTMLInputElement>e.target;
    this.chart.primaryXAxis.isInversed = element.checked;
    this.chart.primaryYAxis.isInversed = element.checked;
    this.chart.dataBind();
}
public startAngle(e: Event): void {
    let value: number = parseInt((<HTMLInputElement>e.target).value, 10);
    this.chart.primaryXAxis.startAngle = value;
    document.getElementById('st-lbl').innerHTML = 'Start Angle: ' + value;
    this.chart.animateSeries =  false;
    this.chart.refresh();
    this.chart.animateSeries =  true;
}
changeType(){
    this.chart.refresh();
    console.log("typedropDown",this.typedropDown);
    this.type=null;
    this.type=this.typedropDown;
    setTimeout(() => {
        this.chart.refresh();
      }, 50); 
}
 changeDrawType(){
    this.chart.refresh();
    console.log("typedropDown",this.drawTypedropDown);
    this.drawType=null;
    this.drawType=this.drawTypedropDown;
    setTimeout(() => {
        this.chart.refresh();
    }, 50); 
} 
proxy: DropDownListComponent;
remove(name) {
    this.chart.removeSeries(name);
    this.arrayOfName.splice(this.arrayOfName.findIndex(x=>x==name),1);
    this.proxy = this.dropdownlist; 
    this.proxy.dataSource = null;
    this.proxy.dataSource = this.arrayOfName;
    this.proxy.dataBind();
}
changeSeriesColor(){
    Object.keys(this.fullData).forEach(key => {
        if(this.fullData[key].name == this.selectedSeries){
            this.fullData[key].color= this.selectedSeriesColor;
        }
    });
}
public seriesType: DropDownList;
ngOnInit(): void {
    this.messagesService.sharedData$.subscribe(sharedData => this.sharedData = sharedData);
    Object.keys(this.fullData).forEach(key => {
        this.arrayOfName.push(this.fullData[key].name)
    });
    this.seriesType = new DropDownList({
        index: 0,
        width: 80,
        change: () => {
            let type: string = this.seriesType.value.toString();
            this.chart.series[0].type = <ChartSeriesType>type;
            this.chart.series[1].type = <ChartSeriesType>type;
            this.chart.refresh();
        }
    });
    this.seriesType.appendTo('#selmode');
}

 constructor(private messagesService: GraphDataService) {
    //code
    this.arrayOfName=new Array;
}

    ngOnChanges(changes: SimpleChanges): void {
        // console.log(this.graphmsg);
        setTimeout(() => {
            this.chart.refresh();
        }, 50); 
    }

}
