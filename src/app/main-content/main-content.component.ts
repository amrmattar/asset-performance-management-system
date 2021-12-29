import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Tab } from 'src/models/tab.model';
import { TabService } from 'src/services/tab.service';
declare var showModal:any;
@Component({
  selector: 'app-main-content',
  templateUrl: './main-content.component.html',
  styleUrls: ['./main-content.component.scss']
})
export class MainContentComponent implements OnInit {
  tabsHistory:any;
arrayOfValues: Array<string>;
@Input() childMessage: any;
track:any[];
activeTabUrl;
clicked:any= false;
  size:number=5 ;
   tabs = [];
   Showindex:any;
   sub:any;
  arrayOfHistory:any[];
  constructor(private tabService: TabService,
    private router: Router,
    private activatedRoute: ActivatedRoute) 
    {
      this.track=new Array;
    this.arrayOfHistory=new Array;
      this.tabsHistory=new Array;
    }
 
  ngOnInit() {
     
    localStorage.setItem("flag", "2");
 this.sub = this.activatedRoute
    .queryParams
    .subscribe(params => {
      
      
      //
    // let showindexhistory=localStorage.getItem("showIndex");
    // this.Showindex=+showindexhistory;
      let asd=params['history'];
     this.Showindex=params['s'];

      if(asd == undefined){
       
      }else{
         let id= localStorage.getItem("flag")
               let type=typeof(asd);
        if(type =="string"){
          if(id="2"){
          // this.arrayOfHistory.push(asd);
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
           
            tab.name=arr[0];
            tab.url=arr[1];
             tab.id=arr[2];

            
          })
          //

        }
       

         }
   
       
              
      }
     
      }
    );
 this.tabs = this.tabService.tabs;


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
  closeTab(index: number,id, event: Event) {
      
        localStorage.setItem("flag","1");
      this.tabService.deleteTab(index);
        this.tabs = this.tabService.tabs;
        if( this.Showindex == undefined){
          //
          var elemnt1=  this.tabs[this.tabs.length-1];
        // this.router.navigate([elemnt1.url]);
        //-------------------------------------mahmoud updated
           this.Showindex=this.tabs[this.tabs.length -1 ].id;
           let arrayOfName:any[]=new Array<string>();
          //arrayOfName = this.tabService.tabs.map(x=>x.name+","+x.url+","+x.id);
          this.tabService.tabs.forEach(x => {
            if(x.parametersId != undefined){
             let s=x.url+","+x.id+","+x.parametersId;
             arrayOfName.push(s);
            }else{
              let y=x.url+","+x.id;
              arrayOfName.push(y);
            }
          });
            if(elemnt1 != undefined){
              if(elemnt1.parametersId != undefined){
      
                this.router.navigate([elemnt1.url,elemnt1.parametersId], { queryParams: { h:arrayOfName,s:this.Showindex} });
              }else{
      
                this.router.navigate([elemnt1.url], { queryParams: { h:arrayOfName,s:this.Showindex} });
              }
            }else{
            this.router.navigate([""]);
            }
            //----------------------------------------------------------
        }else{
           if(id == this.Showindex){
             if(this.tabs.length > 0){
            var lastId=this.tabs[this.tabs.length -1].id;
             }
      
            if(lastId != undefined){
            var item=  this.tabs[this.tabs.length -1];
             this.Showindex=lastId;
            // this.router.navigate([item.url]);
      
      
            //----------------------------begin-------------------
               localStorage.setItem("showIndex",this.Showindex);
               let arrayOfName:any[]=new Array<string>();
          //arrayOfName = this.tabService.tabs.map(x=>x.name+","+x.url+","+x.id);
          this.tabService.tabs.forEach(x => {
            if(x.parametersId != undefined){
             let s=x.url+","+x.id+","+x.parametersId;
             arrayOfName.push(s);
            }else{
              let y=x.url+","+x.id;
              arrayOfName.push(y);
            }
          });
          //   
          if(item.parametersId != undefined){
      
            this.router.navigate([item.url,item.parametersId], { queryParams: { h:arrayOfName,s:this.Showindex} });
           
          }else{
      
            this.router.navigate([item.url], { queryParams: { h:arrayOfName,s:this.Showindex} });
          }
            
              //--------------------------end----------------------
      
      
            }else{
              if(this.tabs.length >0){
          this.Showindex=this.tabs[this.tabs.length -1 ].id;
             //this.router.navigate([this.tabs[this.tabs.length -1 ].url]);
            //----------------begin-------------------------
               localStorage.setItem("showIndex",this.Showindex);
               let arrayOfName:any[]=new Array<string>();
          //arrayOfName = this.tabService.tabs.map(x=>x.name+","+x.url+","+x.id);
          //arrayOfName = this.tabService.tabs.map(x=>x.name+","+x.url+","+x.id);
          this.tabService.tabs.forEach(x => {
            if(x.parametersId != undefined){
             let s=x.url+","+x.id+","+x.parametersId;
             arrayOfName.push(s);
            }else{
              let y=x.url+","+x.id;
              arrayOfName.push(y);
            }
          });
          //   
          if(this.tabs[this.tabs.length -1 ].parametersId != undefined){
      
            this.router.navigate([this.tabs[this.tabs.length -1 ].url,elemnt1.parametersId], { queryParams: { h:arrayOfName,s:this.Showindex} });
           
          }else{
      
          //  this.router.navigate([elemnt1.url], { queryParams: { h:arrayOfName,s:this.Showindex} });
            this.router.navigate([this.tabs[this.tabs.length -1 ].url], { queryParams: { h:arrayOfName,s:this.Showindex} });
          }
            
              //------------------end--------------------------------
              }else{
                this.router.navigate([""]);
              }
            
            }
         
            
        }else{
            if(this.tabs.length >0){
              //
          // this.Showindex=this.tabs[this.tabs.length -1 ].id;
             //this.router.navigate([this.tabs[this.tabs.length -1 ].url]);
            //----------------begin-------------------------
               localStorage.setItem("showIndex",this.Showindex);
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
         // arrayOfName = this.tabService.tabs.map(x=>x.name+","+x.url+","+x.id);
          //   
          if(this.tabs[this.tabs.length -1 ].parametersId != undefined){
      
            this.router.navigate([this.tabs[this.tabs.length -1 ].url,this.tabs[this.tabs.length -1 ].parametersId], { queryParams: { h:arrayOfName,s:this.Showindex} });
           
          }else{
      
          //  this.router.navigate([elemnt1.url], { queryParams: { h:arrayOfName,s:this.Showindex} });
            this.router.navigate([this.tabs[this.tabs.length -1 ].url], { queryParams: { h:arrayOfName,s:this.Showindex} });
          }
            //  this.router.navigate([this.tabs[this.tabs.length -1 ].url], { queryParams: { history:arrayOfName,showIndx:this.Showindex} });
              //------------------end--------------------------------
              }else{
                this.router.navigate([""]);
              }
        }
        }
          
      
        event.preventDefault();
      }

showTabs(id:any,parametersId:any){
   
 this.track.push(id);
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
this.router.navigate([url, parametersId], { queryParams: {  h:arrayOfName,s:this.Showindex} });
}

}
