import { Component, AfterViewInit, EventEmitter, Output, ElementRef, OnInit, HostListener } from '@angular/core';
import { ResizedEvent } from 'angular-resize-event';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { TabService } from 'src/services/tab.service';
import { Tab } from 'src/models/tab.model';
import { Router } from '@angular/router';
import { ElasticSearchService } from 'src/services/ElasticSearchService';
import { ElasticSearchRequest } from 'src/models/requests/ElasticSearchRequest';
import { RecordManagerElasticSearch } from 'src/models/responses/RecordManagerElasticSearch';
import { TableService } from 'src/services/TableService';
import { RelationRecordService } from 'src/services/RelationRecordService';
declare var $: any;

@Component({
    selector: 'app-navigation',
    templateUrl: './navigation.component.html',
    styleUrls: ['./navigation.component.scss'],
    providers:[TableService ]
})
export class NavigationComponent implements AfterViewInit,OnInit {
  inputValidation:boolean = false;
  RelatedTables:any[];
  relatedTableKey:any
  @HostListener('scroll', ['$event'])
  _elasticSearchRequest:ElasticSearchRequest;
  _RecordManagerElasticSearch:RecordManagerElasticSearch[];
  width: number;
  height: number;
  left:number;
  temp:string ='max1';
  message: any ;
  counter:number=10000;
  tablesDataList:any[];
    //@Output() toggleSidebar = new EventEmitter<void>();

    public config: PerfectScrollbarConfigInterface = {};

    public showSearch = false;
    heig: ElementRef<any>;
    tabObj:Tab;
    constructor(private elRef:ElementRef,
      private modalService: NgbModal, 
      private tabService: TabService,
        private router: Router,
        private _ElasticSearchService:ElasticSearchService,
        private _TableService:TableService,
        private _RelationRecordService:RelationRecordService) {
        this.tabObj=new Tab();
        this._elasticSearchRequest=new ElasticSearchRequest();
        this._RecordManagerElasticSearch=new Array<RecordManagerElasticSearch>();
        this.RelatedTables=new Array;
     }
  ngOnInit(): void {
    this.GetTablesWithTypeOne();
  }

    // This is for Notifications
    notifications: Object[] = [
        {
            btn: 'btn-danger',
            icon: 'ti-link',
            title: 'Luanch Admin',
            subject: 'Just see the my new admin!',
            time: '9:30 AM'
        },
        {
            btn: 'btn-success',
            icon: 'ti-calendar',
            title: 'Event today',
            subject: 'Just a reminder that you have event',
            time: '9:10 AM'
        },
        {
            btn: 'btn-info',
            icon: 'ti-settings',
            title: 'Settings',
            subject: 'You can customize this template as you want',
            time: '9:08 AM'
        },
        {
            btn: 'btn-primary',
            icon: 'ti-user',
            title: 'Pavan kumar',
            subject: 'Just see the my admin!',
            time: '9:00 AM'
        }
    ];

    // This is for Mymessages
    mymessages: Object[] = [
        {
            useravatar: 'assets/images/users/1.jpg',
            status: 'online',
            from: 'Pavan kumar',
            subject: 'Just see the my admin!',
            time: '9:30 AM'
        },
        {
            useravatar: 'assets/images/users/2.jpg',
            status: 'busy',
            from: 'Sonu Nigam',
            subject: 'I have sung a song! See you at',
            time: '9:10 AM'
        },
        {
            useravatar: 'assets/images/users/2.jpg',
            status: 'away',
            from: 'Arijit Sinh',
            subject: 'I am a singer!',
            time: '9:08 AM'
        },
        {
            useravatar: 'assets/images/users/4.jpg',
            status: 'offline',
            from: 'Pavan kumar',
            subject: 'Just see the my admin!',
            time: '9:00 AM'
        }
    ];

    ngAfterViewInit() { }
    
   
    openTab(name:string,url: string,icon:string,id:string) {
         
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
        this.tabObj.parametersId =id;
        this.tabService.addTab(this.tabObj);
        
        //this.router.navigateByUrl(url);
        //---------------------------------begin----------------
          let arrayOfName:any[]=new Array<string>();
         // arrayOfName = this.tabService.tabs.map(x=>x.url+","+x.id+","+x.parametersId);
          this.tabService.tabs.forEach(x => {
            if(x.parametersId != undefined){
             let s=x.url+","+x.id+","+x.parametersId;
             arrayOfName.push(s);
            }else{
              let y=x.url+","+x.id;
              arrayOfName.push(y);
            }
          });
          this.router.navigate([url, id], { queryParams: { h:arrayOfName,s:this.tabService.tabs[this.tabService.tabs.length -1].id} });
        //-------------------------------------end-----------------
      }
      }

      sendMessage() {
        this.message={id:1}
        this.messageEvent.emit(this.message)
      }

      @Output() messageEvent = new EventEmitter<string>();


      checkFind(){
        if(this._elasticSearchRequest.query.length > 2){
          this.inputValidation=false;
          this.Find();
        }else{
          this.inputValidation=true;
          this._RecordManagerElasticSearch=[];
        }
          }

      Find(){
        this._RecordManagerElasticSearch=[];
        this._ElasticSearchService.FindAll(this._elasticSearchRequest).subscribe((res:any)=>{
          console.log("res",res);
          if(res.recordManagerElasticSearch != null){
            this._RecordManagerElasticSearch=[...this._RecordManagerElasticSearch,...res.recordManagerElasticSearch];
          }
          console.log("this._RecordManagerElasticSearch",this._RecordManagerElasticSearch);
        })
      }
    

      GetTablesWithTypeOne(){
      this._TableService.GetTablesWithTypeOne("").
      subscribe((res:any)=>{
        this.tablesDataList=res.tablesDataList.filter(x=>x.ttype == 1);
      })
    }

    GetAllRelatedTables(){
      this.checkFind();
      this._RelationRecordService.GetAllRelatedTables(this._elasticSearchRequest.tableKey).subscribe((res:any)=>{
        this.RelatedTables=res.model;

      })
    }
}
