import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { scheduleJop } from 'src/models/scheduleJop';

@Component({
  selector: 'app-schedual-jop-details',
  templateUrl: './schedual-jop-details.component.html',
  styleUrls: ['./schedual-jop-details.component.scss']
})
export class SchedualJopDetailsComponent implements OnInit,OnChanges {
  @Output() FlagEvent = new EventEmitter<boolean>();
  @Input() item: scheduleJop;
  totalRows:any;
  numerOfSuccessRows:any;
  numerOfFailureRows:any;

  constructor() {
    this.item=new scheduleJop(); 
    this.item.schedualJopDetailsList=new Array;
  }
  ngOnChanges(changes: SimpleChanges): void {
    debugger;
    console.log("scheduleJop",this.item);
    this.totalRows= this.item.schedualJopDetailsList.length;
   this.numerOfSuccessRows= this.item.schedualJopDetailsList.filter(x=>x.issuccess == true).length;
   this.numerOfFailureRows= this.item.schedualJopDetailsList.filter(x=>x.issuccess == false).length;
  }

  ngOnInit(): void {
  }

  backToInfoTable() {
    this.FlagEvent.emit(false)
  }
}
