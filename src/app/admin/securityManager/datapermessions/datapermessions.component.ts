import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-datapermessions',
  templateUrl: './datapermessions.component.html',
  styleUrls: ['./datapermessions.component.scss']
})
export class DatapermessionsComponent implements OnInit {
  messageFromParent:any;
  constructor() { }

  ngOnInit(): void {
  }

  receiveMessageFromSideBarPermission($event) {
      
    this.messageFromParent = $event
  }

}
