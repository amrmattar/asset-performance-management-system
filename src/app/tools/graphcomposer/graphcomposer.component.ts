import { Component, OnInit } from '@angular/core';
import { GraphDataService } from './graph-data.service';

@Component({
  selector: 'app-graphcomposer',
  templateUrl: './graphcomposer.component.html',
  styleUrls: ['./graphcomposer.component.scss']
})
export class GraphcomposerComponent implements OnInit {
  viewMode;
  graphparentmsg:any;
  sharedData: string;
  parentCount:any = 'Graph';
  graphColumnData:any;
  constructor(private sharedService: GraphDataService) { }

  
  ngOnInit() {
this.viewMode = "tab1";
console.log(this.viewMode);
this.sharedService.sharedData$
.subscribe(sharedData => this.sharedData = sharedData);
}

updateData(data) {
  this.sharedService.setData(data);
  this.graphparentmsg = data;
}
receiveMessageFromGraphGeneral(event){
  debugger;
    this.graphColumnData=event;
    this.parentCount=event;
  }
}
