import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-datasource-sidebar',
  templateUrl: './datasource-sidebar.component.html',
  styleUrls: ['./datasource-sidebar.component.scss']
})
export class DatasourceSidebarComponent implements OnInit {
  @Output() messageEvent = new EventEmitter<any>();
  flagParent:any={message:false};
  selelctedId:any;
  public data: { [key: string]: Object }[] = [
    { Name: 'APM_Production',  id: '1', },
    
];
  constructor() { }

  ngOnInit(): void {
  }
  select(item){
  let newItem={Name:item.Name,id:item.id}
  console.log(item);
  this.selelctedId=item.id;
  this.flagParent = {message:item};
  this.messageEvent.emit(this.flagParent)
  }
}
