import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-uom',
  templateUrl: './uom.component.html',
  styleUrls: ['./uom.component.scss']
})
export class UOMComponent implements OnInit {
  message:any=0;
  btnflag:boolean;
  parentUnit:any={};
  parentDeleteCategory:any={};

  constructor() { }

  ngOnInit(): void {
  }

  

receiveMessage($event) {
  this.message = $event;
}
unitMessage($event) {
  this.parentUnit = $event;
}

DeleteCategory($event) {
  this.parentDeleteCategory=$event;
}
}
