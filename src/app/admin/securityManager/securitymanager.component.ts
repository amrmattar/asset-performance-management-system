import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Repository } from 'src/app/data/repository';
import { RolesRepository } from 'src/app/data/roleRepository';
import { SitesRepository } from 'src/app/data/sitesRepository';
import { Tab } from 'src/models/tab.model';
import { TabService } from 'src/services/tab.service';
import { UserService } from 'src/services/userservice';
declare var $: any;
declare var showModal:any;
@Component({
  selector: 'app-securitymanager',
  templateUrl: './securitymanager.component.html',
  styleUrls: ['./securitymanager.component.scss'],
  
})
export class SecurityManagerComponent implements OnInit {
  message: any ;

  arrayOfName:any[]
  @Output() messageEvent = new EventEmitter<string>();
  @Input() history: any;

  activeUser:number=0;
  notactiveUser:number=0;
  numberOfRolesCount:number=0;
  numberOfSitescount:number=0;
  menuOptions = [];
  tabObj:Tab;
  counter:number=20000;
  sub:any;
  arrayOfHistory:any[];
  constructor(private repo: Repository,private tabService: TabService,private siteRepo: SitesRepository,
    private roleRepo:RolesRepository,private router: Router,private _userService:UserService) {
    this.tabObj=new Tab();
      this.arrayOfHistory=new Array;
  }
sendMessage() {
    this.message={id:1}
    this.messageEvent.emit(this.message)
  }
  ngOnInit(): void {
    this.GetSecurityManager();
  } 

  GetSecurityManager(){
    this._userService.GetSecurityManager().subscribe(res=>{
       setInterval(()=>{ 
         if(this.activeUser <res.model.activeUsers){
          this.activeUser++;
         }
         if(this.notactiveUser<res.model.notActiveUsers){
          this.notactiveUser++
         }
         if(this.numberOfRolesCount<res.model.numberOfRolesCount){
          this.numberOfRolesCount++
         }
         if(this.numberOfSitescount<res.model.numberOfSitescount){
          this.numberOfSitescount++
         }
        }, 60);
      
    })
  }
  get sizeOfArray(){
    return this.tabService.arraySize-1;
}
openTab(name:string,url: string,icon:string) {
   
  if(this.sizeOfArray == 9){
    showModal("exampleModal");

  }
  if(name=="Users"){
this.goToUsers();
  }
  
  // 
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
    arrayOfName = this.tabService.tabs.map(x=>x.url+","+x.id);
  this.router.navigate([url], { queryParams: { h:arrayOfName,s:this.tabService.tabs[this.tabService.tabs.length -1].id} });
  //-------------------------------------end-----------------
}

}
goToUsers(){
    this.siteRepo.dynamicUserSites=null;
            this.roleRepo.dynamicUserRoles = null;
    this.repo.showForm = false;
    this.repo.showRoles = false;
    this.repo.showSites = false;
    this.repo.entityIsClicked = false;
  }

}
