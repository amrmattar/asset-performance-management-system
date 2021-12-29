import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-datasource-maincontent',
  templateUrl: './datasource-maincontent.component.html',
  styleUrls: ['./datasource-maincontent.component.scss']
})
export class DatasourceMaincontentComponent implements OnInit,OnChanges {
  @Input() childMessage: any;
  public data: string[] = ['Snooker', 'Tennis', 'Cricket', 'Football', 'Rugby'];
  constructor() { }


  ngOnChanges(changes: SimpleChanges): void {
    debugger;
    console.log("childMessage",this.childMessage.message.Name);
   }

  ngOnInit(): void {
  }

}
