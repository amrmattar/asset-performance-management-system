import { AfterViewInit, Component, ElementRef, Input, OnChanges, OnInit } from '@angular/core';
import { TabService } from 'src/services/tab.service';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Tab } from 'src/models/tab.model';
declare var showModal:any;
declare var $: any;
@Component({
  selector: 'app-main-taps',
  templateUrl: './main-taps.component.html',
  styleUrls: ['./main-taps.component.scss']
})
export class MainTapsComponent implements OnInit ,AfterViewInit ,OnChanges{
  width: number;
  height: number;
  left:number;
  // temp:string ='zero-w';
  tabsHistory:any;
arrayOfValues: Array<string>;
@Input() childMessage: any;
track:any[];
activeTabUrl;
clicked:any= false;
  size:number=10 ;
   tabs = [];
   Showindex:any;
   sub:any;
  arrayOfHistory:any[];
  oldwidth: number;
  oldheight: number;
  lastUsed: any;
  DictionaryTabs:any=[
    {"key":"/sc",
    "Icone":"fas fa-user-lock",
    "name":"Security Manager"
    },
    {"key":"/con",
    "Icone":"fas fa-clipboard-check",
    "name":"Configuration manager"
    },
    {"key":"/OM",
    "Icone":"fas fa-chalkboard-teacher",
    "name":"Operation manager"
    },
    {"key":"/Ct",
    "Icone":"fas fa-atlas",
    "name":"Catalog"
    }, 
    {"key":"/u",
    "Icone":"fas fa-users",
    "name":"User"
    },
    {"key":"/s",
    "Icone":"fas fa-sitemap",
    "name":"Sites"
    },
    {"key":"/u",
    "Icone":"fas fa-users",
    "name":"User"
    },   
    {"key":"/r",
    "Icone":"fas fa-user-tag",
    "name":"Roles"
    },
    {"key":"/DP",
    "Icone":"fas fa-user-lock",
    "name":"Data Permessions"
    },
    {"key":"/LI",
    "Icone":"fas fa-handshake",
    "name":"LDAB Integration"
    },
    {"key":"/PP",
    "Icone":"fas fa-handshake",
    "name":"Password Policy"
    },
    {"key":"/DS",
    "Icone":"fas fa-cogs",
    "name":"Default Settings"
    },
    {"key":"/RM",
    "Icone":"fas fa-cogs",
    "name":"Record Manager"
    },
    {"key":"/cons",
    "Icone":"fas fa-clipboard-check",
    "name":"Configuration manager"
    },
    {"key":"/ent",
    "Icone":"fas fa-table",
    "name":"Entities Management"
    },
    {"key":"/dl",
    "Icone":"fas fa-toolbox",
    "name":"Dataloaders"
    },
    {"key":"/uo",
    "Icone":"fas fa-weight",
    "name":"Units Of Measuring"
    }
    ,
    {"key":"/qc",
    "Icone":"fab fa-app-store-ios",
    "name":"Query Composer"
    },
    {"key":"/mss",
    "Icone":"fab fa-app-store-ios",
    "name":"Measuring System"
    },
    {"key":"/daso",
    "Icone":"fas fa-database",
    "name":"Data Source"
    },
    {"key":"/gpc",
    "Icone":"fas fa-project-diagram",
    "name":"Graphs"
    },
    {"key":"/apm",
    "Icone":"fas fa-file-download",
    "name":"APM Formation"
    },
    {"key":"/ashrad",
    "Icone":"fas fa-tree",
    "name":"Asset Hierarchy Admin"
    }
  ]
  constructor(private elRef:ElementRef,
     private tabService: TabService,
    private router: Router,
    private activatedRoute: ActivatedRoute) {
      this.track=new Array;
      this.arrayOfHistory=new Array;
      this.tabsHistory=new Array;
    }
  ngOnInit() {
 let id= localStorage.getItem("flag")
// this.Showindex=id;
    
   
 this.sub = this.activatedRoute
    .queryParams
    .subscribe(params => {
     
       
    let showindexhistory=localStorage.getItem("showIndex");
  
    // this.Showindex=+showindexhistory;
   let asd=params['h'];
 
      this.arrayOfHistory
      if(asd == undefined){
       
      }else{
         let id= localStorage.getItem("flag")
               let type=typeof(asd);
        if(type =="string"){
          if(id="2"){
          this.arrayOfHistory.push(asd);
          }

        }else{
          if(asd != undefined)
          this.arrayOfHistory=asd;
        }
        let counter=0;
        if(this.arrayOfHistory != undefined){
     
        if(id =="2"){
            this.arrayOfHistory.forEach(element => {
               
            let tab=new Tab();
            let arr=element.split(",");
           
          
            tab.url=arr[0];
             tab.id=arr[1];
             tab.name=this.DictionaryTabs.find(x=>x.key==tab.url).name;
             tab.icon=this.DictionaryTabs.find(x=>x.key==tab.url).Icone;
             if(arr[2] != null){
              tab.parametersId=arr[2];
             }
            this.tabService.addTab(tab);
            
          })
          //  

        }
       
         }
       this.tabs = this.tabService.tabs;
      }
       this.Showindex=params['s'];
       if( +this.Showindex> 0){
          this.tabService.lastId=0;
       }
      }
    );
 this.tabs = this.tabService.tabs;
 
// this.Showindex=this.tabs[this.tabs.length -1]
  }

  ngOnChanges(): void {
     
   if(this.sizeOfArray == 9){
     showModal("exampleModal");

   }
    
  }
  get sizeOfArray(){
      return this.tabService.arraySize-1;
  }

  get lastOfId(){
      return this.tabService.lastId;
    
  }

  set stabs(tb:any){
    this.tabService.stabs(tb);;
  }

  closeTab(index: number, id, event: Event) {
     debugger;
     console.log("track",this.track);
    localStorage.setItem("flag", "1");
    this.tabService.deleteTab(index);
    this.tabs = this.tabService.tabs;
    if (this.Showindex == undefined) {
      var elemnt1 = this.tabs[this.tabs.length - 1];
      this.Showindex = this.tabs[this.tabs.length - 1].id;

      let arrayOfName: any[] = new Array<string>();
     // arrayOfName = this.tabService.tabs.map(x => x.url + "," + x.id);
      this.tabService.tabs.forEach(x => {
        if(x.parametersId != undefined){
         let s=x.url+","+x.id+","+x.parametersId;
         arrayOfName.push(s);
        }else{
          let y=x.url+","+x.id;
          arrayOfName.push(y);
        }
      });
      if (elemnt1 != undefined) {

        //this.router.navigate([elemnt1.url], { queryParams: { h: arrayOfName, s: this.Showindex } });
        if(elemnt1.parametersId != undefined && elemnt1.parametersId != null){
  
          this.router.navigate([elemnt1.url,elemnt1.parametersId], { queryParams: { h:arrayOfName,s:this.Showindex} });
        }else{

          this.router.navigate([elemnt1.url], { queryParams: { h:arrayOfName,s:this.Showindex} });
        }
      } else {
        this.router.navigate([""]);
      }
    } else {
      if (id == this.Showindex) {
        if (this.tabs.length > 0) {
          console.log("this.track",this.track);
          if(this.track.length > 1){
            var lastId = this.track[this.track.length - 2];
          }else{
            var lastId = this.track[this.track.length - 1];
          }
         
          //this.track.pop();
          this.track.splice(-1)
        }

        if (lastId != undefined) {
          console.log("lastId",lastId);
          console.log("tabs",this.tabs);
          var item = this.tabs.find(x => x.id == lastId);
          this.Showindex = +lastId;
        
          let arrayOfName: any[] = new Array<string>();
         // arrayOfName = this.tabService.tabs.map(x => x.url + "," + x.id);
          this.tabService.tabs.forEach(x => {
            if(x.parametersId != undefined && x.parametersId != null ){
             let s=x.url+","+x.id+","+x.parametersId;
             arrayOfName.push(s);
            }else{
              let y=x.url+","+x.id;
              arrayOfName.push(y);
            }
          });
          console.log("item",item);
          if(item.parametersId != undefined && item.parametersId != null){
  
            this.router.navigate([item.url,item.parametersId], { queryParams: { h:arrayOfName,s:this.Showindex} });
           
          }else{
      
            this.router.navigate([item.url], { queryParams: { h:arrayOfName,s:this.Showindex} });
          }
         // this.router.navigate([item.url], { queryParams: { h: arrayOfName, s: this.Showindex } });

        } else {
          if (this.tabs.length > 0) {
            this.Showindex = this.tabs[this.tabs.length - 1].id;
           // localStorage.setItem("showIndex", '3');
            localStorage.setItem("showIndex",this.Showindex);
            let arrayOfName: any[] = new Array<string>();
           // arrayOfName = this.tabService.tabs.map(x => x.url + "," + x.id);
            this.tabService.tabs.forEach(x => {
              if(x.parametersId != undefined && x.parametersId != null){
               let s=x.url+","+x.id+","+x.parametersId;
               arrayOfName.push(s);
              }else{
                let y=x.url+","+x.id;
                arrayOfName.push(y);
              }
            });
            if(this.tabs[this.tabs.length -1 ].parametersId != undefined && this.tabs[this.tabs.length -1 ].parametersId != null){
  
              this.router.navigate([this.tabs[this.tabs.length -1 ].url,this.tabs[this.tabs.length -1 ].parametersId], { queryParams: { h:arrayOfName,s:this.Showindex} });
             
            }else{
        
            //  this.router.navigate([elemnt1.url], { queryParams: { h:arrayOfName,s:this.Showindex} });
              this.router.navigate([this.tabs[this.tabs.length -1 ].url], { queryParams: { h:arrayOfName,s:this.Showindex} });
            }
            //this.router.navigate([this.tabs[this.tabs.length - 1].url], { queryParams: { h: arrayOfName, s: this.Showindex } });
          } else {
            this.router.navigate([""]);
          }

        }


      } else {
        this.Showindex = this.tabs[this.tabs.length - 1].id;
        if (this.tabs.length > 0) {
          localStorage.setItem("showIndex", '4');
          let arrayOfName: any[] = new Array<string>();
         // arrayOfName = this.tabService.tabs.map(x => x.url + "," + x.id);
          this.tabService.tabs.forEach(x => {
            if(x.parametersId != undefined && x.parametersId != null){
             let s=x.url+","+x.id+","+x.parametersId;
             arrayOfName.push(s);
            }else{
              let y=x.url+","+x.id;
              arrayOfName.push(y);
            }
          });
          if(this.tabs[this.tabs.length -1 ].parametersId != undefined && this.tabs[this.tabs.length -1 ].parametersId != null ){
  
            this.router.navigate([this.tabs.find(x => x.id == this.Showindex).url,this.tabs[this.tabs.length -1 ].parametersId], { queryParams: { h:arrayOfName,s:this.Showindex} });
           
          }else{
      
          //  this.router.navigate([elemnt1.url], { queryParams: { h:arrayOfName,s:this.Showindex} });
            this.router.navigate([this.tabs.find(x => x.id == this.Showindex).url], { queryParams: { h:arrayOfName,s:this.Showindex} });
          }
          //this.router.navigate([this.tabs.find(x => x.id == this.Showindex).url], { queryParams: { h: arrayOfName, s: this.Showindex } });
        } else {
          this.router.navigate([""]);
        }
      }
    }
    event.preventDefault();
    this.hoverId = 0;
  }



showTabs(id:any,parametersId:any){
    debugger
    let alreadyExist=this.track.find(x=>x == id);
    if(alreadyExist == undefined){
      this.track.push(id);
    }

  console.log("ShowTabs",this.track);
this.clicked== true;
  this.tabService.lastId=0;
this.Showindex=id;
let url=this.tabService.tabs.find(x=>x.id==id).url;
if(parametersId != null){
  this.goToRoutById(url,parametersId);
}else{
  this.goToRout(url);
}


}



goToRout(url:any){
    
  localStorage.setItem("flag","1");

    let arrayOfName:any[]=new Array<string>();
    this.tabService.tabs.forEach(x => {
      if(x.parametersId != undefined){
      let s=x.url+","+x.id+","+x.parametersId;
      arrayOfName.push(s);
      }else{
        let y=x.url+","+x.id;
        arrayOfName.push(y);
      }
    });
  this.router.navigate([url], { queryParams: {  h:arrayOfName,s:this.Showindex} });
}
goToRoutById(url:any,parametersId){
   
 localStorage.setItem("flag","1");
 //this.router.navigateByUrl(url);
   let arrayOfName:any[]=new Array<string>();
  // arrayOfName = this.tabService.tabs.map(x=>x.name+","+x.url+","+x.id+","+x.icon);
  this.tabService.tabs.forEach(x => {
    if(x.parametersId != undefined){
     let s=x.url+","+x.id+","+x.parametersId;
     arrayOfName.push(s);
    }else{
      let y=x.url+","+x.id;
      arrayOfName.push(y);
    }
  });
 this.router.navigate([url, parametersId], { queryParams: {  h:arrayOfName,s:this.Showindex} });
}

//  onResized(event: ResizedEvent) {
//   //   
//     this.width = event.newWidth;
//     this.oldwidth = event.oldWidth;
//     this.height = event.newHeight;
//     this.oldheight = event.oldHeight;
//     this.left = this.elRef.nativeElement.offsetLeft;
    
//     if( this.tabs.length < 6 && this.left < 100){
//       this.temp='zero-w';
//     }
//     else if(this.tabs.length == 6 && this.left < 100 || (this.left > 100 && this.tabs.length == 5 )){
//       this.temp='first-w';
//     }
//     else if(this.tabs.length == 7 && this.left < 100  || (this.left > 100 && this.tabs.length == 6 )){
//       this.temp='second-w';
//     }
//     else if(this.tabs.length >= 8 && this.left < 100 || (this.left > 100 && this.tabs.length == 7 )){
//       this.temp='third-w';
//     }
//     else if( this.height > 60 && this.left > 100 || (this.left > 100 && this.tabs.length >= 8 && this.height > 60)){
//       this.temp='forth-w';
//     }
//   }
hoverId:any=0;
  over(id:any){
  this.hoverId=id; 
  }

  out(){
    this.hoverId=0;
  }
  ngAfterViewInit(): void {
  $(function () {
                $('[data-toggle="tooltip"]').tooltip()
            })
}
get temp(){
return this.tabService.temp;
}
}
