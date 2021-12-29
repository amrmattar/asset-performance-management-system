import { Component, AfterViewInit, OnInit, ViewChild  } from '@angular/core';
import { ROUTES } from './menu-items';
import { RouteInfo } from './sidebar.metadata';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {  EventEmitter, Output } from '@angular/core';
import { Tab } from 'src/models/tab.model';
import {  Input } from '@angular/core';
import {  NavigationExtras } from '@angular/router';
import { TabService } from 'src/services/tab.service';
declare var $: any;

@Component({
    selector: 'app-sidebar',
    styleUrls: ['./sidebar.component.scss'],
    templateUrl: './sidebar.component.html'

})
export class SidebarComponent implements OnInit {
    showMenu = '';
    showSubMenu = '';
    public isCollapsed = true;
    public sidebarnavItems: any[];
      message: any ;
  arrayOfName:any[]
  @Output() messageEvent = new EventEmitter<string>();
  @Input() history: any;


  
  sendMessage() {
    this.message={id:1}
    this.messageEvent.emit(this.message)
  }
  menuOptions = [];
  tabObj:Tab;
  //لو هتضيف مدخل جديد
  counter:number=10000;
  sub:any;
  arrayOfHistory:any[];
    // this is for the open close
    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }

    }
    addActiveClass(element: any) {
        if (element === this.showSubMenu) {
            this.showSubMenu = '0';
        } else {
            this.showSubMenu = element;
        }
        window.scroll({
            top: 0,
            left: 0,
            behavior: 'smooth'
        });
    }

    constructor(
        private tabService: TabService,
        private modalService: NgbModal,
        private router: Router,
        private route: ActivatedRoute
    ) { 
        this.tabObj=new Tab();
        this.arrayOfHistory=new Array;
    }

    // End open close
    ngOnInit() {
        // this.sidebarnavItems = ROUTES.filter(sidebarnavItem => sidebarnavItem);
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

    signout(){
      localStorage.removeItem("userToken");
      localStorage.removeItem("currentUser");
      localStorage.removeItem("Url");
      window.location.replace("/login");
    }
}
