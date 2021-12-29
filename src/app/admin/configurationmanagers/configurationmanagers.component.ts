import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Tab } from 'src/models/tab.model';
import { TabService } from 'src/services/tab.service';
import { UserService } from 'src/services/userservice';
declare var showModal:any;
@Component({
  selector: 'app-configurationmanagers',
  templateUrl: './configurationmanagers.component.html',
  styleUrls: ['./configurationmanagers.component.scss']
})
export class ConfigurationmanagersComponent implements OnInit {
  message: any ;
  arrayOfName:any[]
  @Output() messageEvent = new EventEmitter<string>();
  @Input() history: any;
  menuOptions = [];
  tabObj:Tab;
  counter:number=30000;
  sub:any;
  arrayOfHistory:any[];
  constructor(private tabService: TabService,private router: Router,private _userService:UserService
    ) {
    this.tabObj=new Tab();
      this.arrayOfHistory=new Array;
  }
sendMessage() {
    this.message={id:1}
    this.messageEvent.emit(this.message)
  }


  ngOnInit(): void {
  }
  get sizeOfArray(){
    return this.tabService.arraySize-1;
}
  openTab(name:string,url: string,icon:string) {
    if(this.sizeOfArray == 9){
      showModal("exampleModal");
  
    }
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
      // arrayOfName = this.tabService.tabs.map(x=>x.url+","+x.id);
      this.tabService.tabs.forEach(x => {
        if(x.parametersId != undefined){
         let s=x.url+","+x.id+","+x.parametersId;
         arrayOfName.push(s);
        }else{
          let y=x.url+","+x.id;
          arrayOfName.push(y);
        }
      });
      this.router.navigate([url], { queryParams: { h:arrayOfName,s:this.tabService.tabs[this.tabService.tabs.length -1].id} });
    //-------------------------------------end-----------------
  }
  }
}
