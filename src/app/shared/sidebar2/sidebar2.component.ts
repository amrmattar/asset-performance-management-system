import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {  Input } from '@angular/core';
import { ActivatedRoute, NavigationExtras, Router } from '@angular/router';
import { Tab } from 'src/models/tab.model';
import { TabService } from 'src/services/tab.service';
@Component({
  selector: 'app-sidebar2',
  templateUrl: './sidebar2.component.html',
  styleUrls: ['./sidebar2.component.scss']
})
export class Sidebar2Component implements OnInit {
  message: any ;
  arrayOfName:any[]
  @Output() messageEvent = new EventEmitter<string>();
  @Output() ExpandEvent = new EventEmitter<boolean>();
  @Input() history: any;

  
  sendMessage() {
    this.message={id:1}
    this.messageEvent.emit(this.message)
  }
  sendExpand(flag) {
    this.ExpandEvent.emit(flag)
  }

  menuOptions = [];
  tabObj:Tab;
  counter:number=0;
  sub:any;
  arrayOfHistory:any[];
  constructor(
    private tabService: TabService
    ,private router: Router,
    private activatedRoute: ActivatedRoute) {
      this.tabObj=new Tab();
      this.arrayOfHistory=new Array;
     }

  ngOnInit(): void {
    //  this.menuOptions = this.tabService.tabOptions;
  }
openTab(name:string,url: string,icon:string) {

  //-----------------begin---------------------
  localStorage.setItem("flag","1");
  if(this.tabService.arraySize == 10){
  this.sendMessage();
  }else{
  this.tabObj=new Tab();
//  
if(this.tabService.arraySize != 0){
this.counter= +this.tabService.tabs[this.tabService.arraySize -1].id +1;
}else{
  this.counter ++;
}
  
  this.tabObj.id =this.counter;
  this.tabObj.name = name;
  this.tabObj.url =url;
  this.tabObj.icon =icon;
  this.tabService.addTab(this.tabObj);
  
  //this.router.navigateByUrl(url);
  //---------------------------------begin----------------
    let arrayOfName:any[]=new Array<string>();
  //  arrayOfName = this.tabService.tabs.map(x=>x.url+","+x.id+","+x.parametersId);
    this.tabService.tabs.forEach(x => {
      if(x.parametersId != undefined){
       let s=x.url+","+x.id+","+x.parametersId;
       arrayOfName.push(s);
      }else{
        let s=x.url+","+x.id;
        arrayOfName.push(s);
      }
    });
    this.router.navigate([url], { queryParams: { h:arrayOfName,s:this.tabService.tabs[this.tabService.tabs.length -1].id} });
  //-------------------------------------end-----------------
}
}
signout(){
  localStorage.removeItem("userToken");
  localStorage.removeItem("currentUser");
  localStorage.removeItem("Url");
  window.location.replace("/login");
   
}
}
