import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-datasource',
  templateUrl: './datasource.component.html',
  styleUrls: ['./datasource.component.scss']
})
export class DatasourceComponent implements OnInit {
  message:any;
  
  constructor() { }
  

  ngOnInit(): void {
  }

  receiveMessage($event) {
    this.message = $event
  }

}
