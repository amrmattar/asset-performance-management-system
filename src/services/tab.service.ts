import { Injectable } from '@angular/core';
import {  Tab } from 'src/models/tab.model';

 
@Injectable({
  providedIn: 'root',
})
export class TabService {
  temp:any;
  tabs: Tab[] = [];
  arraySize:number=0;
  lastId:number=0;

  tabOptions: Tab[] = [
    // { name: 'Movies', url: '/movies' },
    //  { name: 'Songs',   url: '/songs' }
    ];
 
  constructor() {}
  addTab(tabobj:Tab) {
  // const tab = this.getTabOptionByUrl(url);
  this.tabs.push(tabobj);
  this.lastId=tabobj.id;
  this.arraySize = this.tabs.length;
  if( this.tabs.length < 7 ){
          this.temp='zero-w';
        }
        else if(this.tabs.length == 7 ){
          this.temp='first-w';
        }
        else if(this.tabs.length == 8 ){
          this.temp='second-w';
        }
        else if(this.tabs.length == 9 ){
          this.temp='third-w';
        }
        else if(this.tabs.length == 10 ){
          this.temp='forth-w';
        }
  // var myJSON = JSON.stringify(this.tabs);
  // localStorage.setItem("oldItems", myJSON);
  
}
 
getTabOptionByUrl(url: string): Tab {
  return this.tabOptions.find(tab =>tab.url == url);
}
 
deleteTab(index: number) {
  this.tabs.splice(index, 1);
    this.arraySize = this.tabs.length;
    if( this.tabs.length < 7 ){
      this.temp='zero-w';
    }
    else if(this.tabs.length == 7 ){
      this.temp='first-w';
    }
    else if(this.tabs.length == 8 ){
      this.temp='second-w';
    }
    else if(this.tabs.length == 9 ){
      this.temp='third-w';
    }
    else if(this.tabs.length == 10 ){
      this.temp='forth-w';
    }
}

// getLenthOfTabs(){
//   return this.tabs.length;
// }

 stabs(tb:any){
    this.tabs=tb;
  }

  pushSotarageData(ListTabs:any){
    //  
    ListTabs.forEach(element => {
      this.tabs.push(element)
    });
    
  }

}