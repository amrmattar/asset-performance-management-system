import { Injectable } from '@angular/core';
import {Observable, Subject} from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class LdabDataService {
  public dataSource: any = [
    { Name: 'Nancy',      id: '1', },
    { Name: 'Janet',      id: '2',},
    { Name: 'Margaret',   id:'4', },

];
  constructor() { }

  private tab = new Subject<any>()
  private caption = new Subject<any>()
  private updatecaption = new Subject<any>()

  settabInfo(user: any) {
    this.tab.next(user);
  }

  gettabInfo() {
    return this.tab.asObservable();
  }
  setcaptionInfo(caption: any) {
    this.caption.next(caption);
  }

  getcaptionInfo() {
    return this.caption.asObservable();
  } 
   setupdatecaptionInfo(updatecaption: any) {
     debugger;
    this.updatecaption.next(updatecaption);
  }

  getupdatecaptionInfo() {
    return this.updatecaption.asObservable();
  }

  UpdateDataSource(item){
  // let itemOfDataSource= this.dataSource.find(x=>x.id == item.id);
   this.dataSource.find(x=>x.id == item.id).Name=item.Name;
   console.log("this.dataSource",this.dataSource);
  }
}
