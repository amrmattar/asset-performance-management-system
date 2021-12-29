import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GraphDataService {
  selectedGraphs:any;

  private sharedData: Subject<any> = new Subject<any>();
  sharedData$: Observable<any> = this.sharedData.asObservable();

  constructor() { }

  setData(updatedData) {
    this.sharedData.next(updatedData);
  }


  getHelloMessage() {
    return this.selectedGraphs;
  }

  setHelloMessage(newMessage) {
    this.selectedGraphs = newMessage;
  }

}
