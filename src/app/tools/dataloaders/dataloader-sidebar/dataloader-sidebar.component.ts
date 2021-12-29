import { Component, OnInit } from '@angular/core';
import { scheduleJop } from 'src/models/scheduleJop';
import { ScheduleJopService } from 'src/services/ScheduleJopService';

@Component({
  selector: 'app-dataloader-sidebar',
  templateUrl: './dataloader-sidebar.component.html',
  styleUrls: ['./dataloader-sidebar.component.scss']
})
export class DataloaderSidebarComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
 

}
