import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@aspnet/signalr';
import { scheduleJop } from 'src/models/scheduleJop';
import { ScheduleJopService } from 'src/services/ScheduleJopService';
import { SignalRService } from 'src/services/SignalRService';

@Component({
  selector: 'app-dataloaders',
  templateUrl: './dataloaders.component.html',
  styleUrls: ['./dataloaders.component.scss']
})
export class DataloadersComponent implements OnInit {
  items:scheduleJop[];
  constructor() { 
                
              }

  ngOnInit(): void {
    
  }





}
