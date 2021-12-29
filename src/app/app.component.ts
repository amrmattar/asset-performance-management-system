import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
declare var $: any;

import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { TabService } from 'src/services/tab.service';
import { TranslateService } from '@ngx-translate/core';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  title = 'app';
  message: string;
  sub:any;
 arrayOfHistory:any[];
 tabsHistory:any;
  receiveMessage($event) {
    this.message = $event
  }
    public config: PerfectScrollbarConfigInterface = {};

    constructor(public translate: TranslateService,public router: Router,private activatedRoute: ActivatedRoute,
    private tabService:TabService) {
        this.tabsHistory=new Array;
this.arrayOfHistory=new Array;
    translate.addLangs(['en', 'es']);
    translate.setDefaultLang('en');
    }


     switchLang(lang: string) {
  this.translate.use(lang);
}

    tabStatus = 'justified';

    public isCollapsed = false;

    public innerWidth: any;
    public defaultSidebar: any;
    public showSettings = false;
    public showMobileMenu = false;
    public expandLogo = false;
    public flag:boolean=false;
    options = {
        theme: 'light', // two possible values: light, dark
        dir: 'ltr', // two possible values: ltr, rtl
        layout: 'vertical', // fixed value. shouldn't be changed.
        sidebartype: 'mini-sidebar', // four possible values: full, iconbar, overlay, mini-sidebar
        sidebarpos: 'fixed', // two possible values: fixed, absolute
        headerpos: 'fixed', // two possible values: fixed, absolute
        boxed: 'full', // two possible values: full, boxed
        navbarbg: 'skin1', // six possible values: skin(1/2/3/4/5/6)
        sidebarbg: 'skin5', // six possible values: skin(1/2/3/4/5/6)
        logobg: 'skin5' // six possible values: skin(1/2/3/4/5/6)
        
    };

    Logo() {
        this.expandLogo = !this.expandLogo;
    }

    ngOnInit() {
        // if (this.router.url === '/') {
        //     this.router.navigate(['/dashboard/dashboard1']);
        // }
        this.defaultSidebar = this.options.sidebartype;
        this.handleSidebar();
    }

    @HostListener('window:resize', ['$event'])
    onResize(event) {
        this.handleSidebar();
    }
    scrollHandler(event) {
    }
    handleSidebar() {
        this.innerWidth = window.innerWidth;
        switch (this.defaultSidebar) {
            case 'full':
            case 'iconbar':
                if (this.innerWidth < 1170) {
                    this.options.sidebartype = 'mini-sidebar';
                } else {
                    this.options.sidebartype = this.defaultSidebar;
                }
                break;

            case 'overlay':
                if (this.innerWidth < 767) {
                    this.options.sidebartype = 'mini-sidebar';
                } else {
                    this.options.sidebartype = this.defaultSidebar;
                }
                break;

            default:
        }
    }

    toggleSidebarType() {

        this.flag=!this.flag;
        switch (this.options.sidebartype) {
            case 'full':
            case 'iconbar':
                this.options.sidebartype = 'mini-sidebar';
                break;

            case 'overlay':
                this.showMobileMenu = !this.showMobileMenu;
                break;

            case 'mini-sidebar':
                if (this.defaultSidebar === 'mini-sidebar') {
                    this.options.sidebartype = 'full';
                    this.width="260px";
                } else {
                    this.options.sidebartype = this.defaultSidebar;
                    this.width="70px";
                }
                break;

            default:
        }
    }
    width:string;
    collabseExpand:boolean=false;
    expand:boolean=false;
    receiveExpand($event) {
        this.expand = $event;
        if(this.expand){
            this.width="260px"
        }else{
            this.width="70px"
        }
      }


}
