import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@aspnet/signalr';
import { Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { scheduleJop } from 'src/models/scheduleJop';

@Injectable({
providedIn: 'root'
})
export class SignalRService {
private connection: HubConnection;
itemUpdated: Subject<scheduleJop> = new Subject<scheduleJop>();
itemAdded: Subject<scheduleJop> = new Subject<scheduleJop>();

constructor() {
    debugger
    this.connection = new HubConnectionBuilder()
    .withUrl(environment.apiUrl+'/scheduleJopHub')
    .build();
    this.registerOnEvents();
    this.connection.start().catch(err => console.log(err.toString()));
}

registerOnEvents() {
    this.connection.on('itemAdded', item => {
    console.log('itemAdded');
    this.itemAdded.next(item);
    });

    this.connection.on('itemUpdated', item => {
    console.log('itemUpdated');
    this.itemUpdated.next(item);
    });
}
}