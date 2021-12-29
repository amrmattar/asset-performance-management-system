import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PerfectScrollbarComponent, PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { UOMService } from 'src/services/UOMService';

@Component({
  selector: 'app-measuring-system-side-bar',
  templateUrl: './measuring-system-side-bar.component.html',
  styleUrls: ['./measuring-system-side-bar.component.scss']
})
export class MeasuringSystemSideBarComponent implements OnInit {


  public config: PerfectScrollbarConfigInterface = {};
  
  @Output() messageEvent = new EventEmitter<any>();
  @Input() unit:any;
  btnflag:boolean=false;
 Search:any="";
  constructor() { }
  public setSearch() {
  
  }
  
  ngOnInit(): void {
  }
  ngOnChanges() {
    if(this.unit.flag==true){
      
    }
   
  }
  

}
