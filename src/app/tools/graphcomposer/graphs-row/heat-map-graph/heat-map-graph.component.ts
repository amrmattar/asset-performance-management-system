import { Component, ViewEncapsulation } from '@angular/core';
import { HeatMap, Legend, Tooltip, ILoadedEventArgs, HeatMapTheme } from '@syncfusion/ej2-angular-heatmap';
import { getDatasource } from './default-data';
HeatMap.Inject(Tooltip, Legend);

@Component({
  selector: 'app-heat-map-graph',
  templateUrl: './heat-map-graph.component.html',
  styleUrls: ['./heat-map-graph.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeatMapGraphComponent  {

  titleSettings: Object = {
    text: 'Sales Revenue per Employee (in 1000 US$)',
    textStyle: {
        size: '15px',
        fontWeight: '500',
        fontStyle: 'Normal'
    }
};
dataSource: Object[] = getDatasource().dataSource;
xAxis: Object = {
    labels: ['Nancy', 'Andrew', 'Janet', 'Margaret', 'Steven', 'Michael', 'Robert',
        'Laura', 'Anne', 'Paul', 'Karin', 'Mario'],
};
yAxis: Object = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
};
public load(args: ILoadedEventArgs): void {
    let selectedTheme: string = location.hash.split('/')[1];
    selectedTheme = selectedTheme ? selectedTheme : 'Material';
    args.heatmap.theme = <HeatMapTheme>(selectedTheme.charAt(0).toUpperCase() + selectedTheme.slice(1));
};
constructor() {
    //code
};

}
