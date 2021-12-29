import { ThisReceiver } from '@angular/compiler';
import { Component, Input, OnInit, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { GraphDataService } from '../graph-data.service';

@Component({
  selector: 'app-graphtype',
  templateUrl: './graphtype.component.html',
  styleUrls: ['./graphtype.component.scss']
})
export class GraphtypeComponent implements OnInit ,OnChanges {
  
  @Input() graphcompossermsg: any;
  graph:string = 'column';
  radioChecked:string = 'column';
  radargraph:boolean = false;
  columngraph:boolean = false;
  linegraph:boolean = false;
  piegraph:boolean = false;
  scattergraph:boolean = false;
  stockgraph:boolean = false;
  heatgraph:boolean = false;
  selectedGraphs:any;
  arrayOfSelectedGrapyh: any=[];
  sharedData: string;
  presharedata: string = 'noview1';

  constructor(private messagesService: GraphDataService) { 
    this.arrayOfSelectedGrapyh=new Array;
  }
  ngOnChanges(changes: SimpleChanges): void {

    this.messagesService.sharedData$.subscribe(sharedData => this.sharedData = sharedData);
    this.selectedGraphs = this.messagesService.getHelloMessage();
    console.log(this.selectedGraphs, this.sharedData, this.presharedata)
    if (this.selectedGraphs != undefined && this.sharedData == 'noview' && this.presharedata != 'view') {
      this.radargraph = false;
      this.columngraph = false;
      this.linegraph = false;
      this.piegraph = false;
      this.scattergraph = false;
      this.stockgraph = false;
      this.heatgraph = false;
      this.arrayOfSelectedGrapyh=[]
      for (let index = 0; index < this.selectedGraphs.length; index++) {
        this.arrayOfSelectedGrapyh.push(this.selectedGraphs[index].Caption)
      }
    const columnLinegrapharr = ["Countries","Sales"];
    const piegrapharr = ["Browser States"];
    const radargrapharr = ["Weather","Year"];
    const heatgrapharr = ["heat Calender"];
    const stockgrapharr = ["profit","date"];
    const scattergrapharr = ["height","weight"];
    const contains = (first, second) => {
    const indexArray = first.map(el => {
      return second.indexOf(el);
    });
    return indexArray.indexOf(-1) === -1;
    }
    this.columngraph = contains(columnLinegrapharr, this.arrayOfSelectedGrapyh);
    this.linegraph = contains(columnLinegrapharr, this.arrayOfSelectedGrapyh);
    this.radargraph = contains(radargrapharr, this.arrayOfSelectedGrapyh);
    this.heatgraph = contains(heatgrapharr, this.arrayOfSelectedGrapyh);
    this.piegraph = contains(piegrapharr, this.arrayOfSelectedGrapyh);
    this.stockgraph = contains(stockgrapharr, this.arrayOfSelectedGrapyh);
    this.scattergraph = contains(scattergrapharr, this.arrayOfSelectedGrapyh);

    if (this.columngraph == true) {
      this.graph= 'column';
      this.radioChecked = 'column';
    } else if (this.linegraph == true) {
      this.graph= 'line';
      this.radioChecked = 'line';
    }else if (this.piegraph == true) {
      this.graph= 'pie';
      this.radioChecked = 'pie';
    }else if (this.radargraph == true) {
      this.graph= 'radar';
      this.radioChecked = 'radar';
    }else if (this.scattergraph == true) {
      this.graph= 'stock';
      this.radioChecked = 'stock';
    }else if (this.stockgraph == true) {
      this.graph= 'scatter';
      this.radioChecked = 'scatter';
    }else if (this.heatgraph == true) {
      this.graph= 'heat';
      this.radioChecked = 'heat';
    }
    } 
    this.presharedata = this.sharedData;
  }

  ngOnInit(): void {
   

    
  }

  graphswitch(args , graphchangh){
    if(args == true){
      this.graph = graphchangh;
    }
  }
  graphenter(args , enter){
    if(args == true){
      this.graph = enter;
    }
  }
  graphleave(leave){
    this.graph = this.radioChecked;
  }
}
