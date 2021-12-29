import { OnInit, Component, ViewContainerRef, ViewChild, ViewEncapsulation, AfterContentChecked, OnDestroy, AfterViewChecked, AfterViewInit, Renderer2, EventEmitter, Output } from '@angular/core';
import { catalogsMetadata, CatalogsRepository } from 'src/app/data/catalogs.repository';
import { SysCatalog } from 'src/models/responses/syscatalog';
import { Subject, Subscription } from 'rxjs';
import { BeforeOpenCloseMenuEventArgs, MenuEventArgs, MenuItemModel, NodeCheckEventArgs, NodeEditEventArgs, NodeSelectEventArgs, TreeViewComponent } from '@syncfusion/ej2-angular-navigations';
import { CatalogItemsTableComponent } from '../catalog-items/catalog.items.table.component';
import { NotificationsService, NotificationType } from 'angular2-notifications';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import {NgbModal, ModalDismissReasons,NgbModalConfig} from '@ng-bootstrap/ng-bootstrap';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { CatalogService } from 'src/services/CatalogService';
declare var hideModal:any;
declare var showModal:any;
@Component({
    selector: 'catalog-sidebar',
    templateUrl: './catalog.sidebar.component.html',
    styleUrls: ['./catalog.sidebar.component.scss'],
    providers: [CatalogItemsTableComponent,NgbModalConfig, NgbModal],
    encapsulation: ViewEncapsulation.None
})
export class CatalogSidebarComponent implements AfterViewInit, OnDestroy, OnInit {
    selectedIdList:any[];
    catalogsDataList:any;
    open(content) {
        this.modalService.open(content);
      }

    public config: PerfectScrollbarConfigInterface = {};
  

    selectedItem:any[]=[];
    BeforeOpenCatalogMsg:SysCatalog;
    private subscriptions = new Subscription();

    public field: Object = {};
    public search: string;
    public cssClass: string = "custom";
    selectedCatKey: number;
    constructor(config: NgbModalConfig,private modalService: NgbModal,
        private repo: CatalogsRepository,private renderer: Renderer2,
        private _CatalogItemsTableComponent:CatalogItemsTableComponent,
        private notifications: NotificationsService,
        private translateService: TranslateService,
        private toastr: ToastrService,
        private _CatalogService:CatalogService) {
            config.backdrop = 'static';
            config.keyboard = false;
            this.selectedIdList=new Array;
            this.BeforeOpenCatalogMsg=new SysCatalog();
    }
    @ViewChild("treevalidate") treevalidate: TreeViewComponent;
  @ViewChild("contentmenutree") contentmenutree: any;

  public menuItems: MenuItemModel[] = [
        {
            text: "Add New Catalog",
            iconCss: 'fa fa-folder'
        },{
            text: "Rename",
            iconCss: 'fas fa-edit'
        },{
            text: "Delete",
            iconCss: 'fa fa-trash'
        },
        {
            separator: true
        },
        {
            text: "Properties",
            iconCss: 'fas fa-info-circle'
        }
    ];
  
  public index: number = 1;

  public menuclick(args: MenuEventArgs) {
    if(args.item.text =="Add New Catalog"){
        this.newcat();
    }else if(args.item.text =="Rename"){
        this.begin(this.selectedIdclicked);
    }else if(args.item.text =="Delete"){
        this.open(this.contentclicked);     
    }else if(args.item.text == "Properties"){
        showModal("PropertiesModal");
    }
  }
  newcat(){
       
    let targetNodeId: string = this.treevalidate.selectedNodes[0];


    let nodeId: string = "tree_" + this.index;
  let key=+this.selectedIdclicked;
  let obj:SysCatalog=this.find2(this.catalogs,key);
  let caption="";
  let resultOfNew=[];
  if(obj != undefined){
     resultOfNew = obj.catalogs.filter(item => item.caption.includes("New Catalog"));
  }

      if(resultOfNew.length == 0){
          caption="New Catalog";
      }else{const regex = new RegExp(/New Catalog\([0-9]+\)/);
          let result = obj.catalogs.filter(({caption}) => caption.match(regex));
          
          let ListOfNumber=[];
          if(result.length == 0){
              caption="New Catalog(2)";
          }else{
              for(let i =0; i<result.length ; i++){
                  let demoArray1=result[i].caption.split("(");
                  let demoArray2=demoArray1[1].split(")");
                  let number=parseInt(demoArray2[0]);
                  ListOfNumber.push(number);
                
              } 
              
              for(let item =0; item< ListOfNumber.length; item++){
                  
                  let counter =item+2;
                  if(ListOfNumber.find(x=>x==counter)){
                      let n=counter+1;
                      caption="New Catalog("+n+")";
              }else{
                  let n=counter;
                  caption="New Catalog("+n+")";
                  break
              }
          }
          }
         

      }
  
    let newNode: SysCatalog;
   
   if(this.selectedIdclicked == undefined){
      newNode = { parentCatKey: 0, caption:caption }
   }else{
      newNode = { parentCatKey: this.selectedIdclicked , caption }
   }
 
  this.subscriptions.add(this.repo.saveCatalog(newNode).subscribe((res)=>{
      this.selectedId=res;
      this.repo.getCatalogs().subscribe(md => {
          this.catalogs = md.catalogsDataList;
         this.selectedIdList.push(String(this.selectedIdclicked));
          this.selectedIdList.forEach(element => {
            this.changeExpanded(element);
          });
          
          this.find(this.catalogs,res);
          this.field = { dataSource: this.catalogs, id: 'catkey', text: 'caption',
           child: 'catalogs', iconCss: 'icon',selected: 'isSelected'  };
           setTimeout(() => {
              this.begin(res);
          }, 50); 
      })}));
      this.treevalidate.beginEdit(nodeId);
  }
  public beforeopen(args: BeforeOpenCloseMenuEventArgs) {
    //     
    this.selectedIdclicked=this.selectedId;
    let selectedCat:any= this.catalogs.find(x=>x.catkey == this.selectedIdclicked);
    let DeletedCat:SysCatalog=this.find2(this.catalogs, this.selectedId);
    if(DeletedCat != undefined){
        this.BeforeOpenCatalogMsg=DeletedCat;
    }
      this.contentclicked=this.content;
    let targetNodeId: string = this.treevalidate.selectedNodes[0];

    let targetNode: Element = document.querySelector(
      '[data-uid="' + targetNodeId + '"]'
    );   
     this.selectedCatKey=  Number(targetNodeId);

  }
  ngAfterViewInit() {
  }

    ngOnInit() {
        this.search = this.repo.filter.search;
        this.subscriptions.add(
            this.repo.getCatalogs().subscribe(md => {
            this.catalogs = md.catalogsDataList;
            this.field = { dataSource: this.catalogs, id: 'catkey', text: 'caption', child: 'catalogs', iconCss: 'icon',selected: 'isSelected' }; 
            //  this.treevalidate.beginEdit("1888");
        }));
        this.GetAllCatalog();
    }
    ngOnDestroy(): void {
        this.subscriptions.unsubscribe();
    }
    get catalogs(): SysCatalog[] {
        
        return this.repo.catalogs;
    }
    set catalogs(val: SysCatalog[]) {
        this.repo.catalogs = val;
        this.repo.getCatalogs();
    }
    begin(ckey:any){
        this.treevalidate.beginEdit(ckey.toString());
    }
     addToRoot() {
        
        // 
        let caption="";
        let resultOfNew = this.catalogs.filter(item => item.caption == "New Catalog");
        if(resultOfNew.length == 0){
            caption="New Catalog";
        }else{
            const regex = new RegExp(/New Catalog\([0-9]+\)/);
            let result = this.catalogs.filter(({caption}) => caption.match(regex));
            let ListOfNumber=[];
            if(result.length == 0){
                caption="New Catalog(2)";
            }else{
                for(let i =0; i<result.length ; i++){
                    let demoArray1=result[i].caption.split("(");
                    let demoArray2=demoArray1[1].split(")");
                    let number=parseInt(demoArray2[0]);
                    ListOfNumber.push(number);
                  
                } 
                
                for(let item =0; item< ListOfNumber.length; item++){
                    
                    let counter =item+2;
                    if(ListOfNumber.find(x=>x==counter)){
                        let n=counter+1;
                        caption="New Catalog("+n+")";
                }else{
                    let n=counter;
                    caption="New Catalog("+n+")";
                    break
                }
            }
            }
           
        }
        
         let newNode: SysCatalog = { parentCatKey: 0 , caption:caption }
        
        this.subscriptions.add(this.repo.saveCatalog(newNode).subscribe((res)=>{
            
            this.repo.getCatalogs().subscribe(md => {
            
                this.catalogs = md.catalogsDataList;
                this.find(this.catalogs,res)
                this.field = { dataSource: this.catalogs, id: 'catkey',
                 text: 'caption', child: 'catalogs', iconCss: 'icon',
                selected: 'isSelected'}; 
                setTimeout(() => {
                    this.begin(res);
                }, 50);
            })}));
            
    }
     find = (array:SysCatalog[], id) => {
        var result;
        array.some(o => result = o.catkey === id ? o.isSelected=true : this.find(o.catalogs || [], id));
    };
    
    find2 = (array = [], id) => {
        for (const item of array) {
          const result = item.catkey === id ? item : this.find2(item.catalogs, id);
          if(result) return result;
        }
      };
   
    selectedId:any;
    content:any;
    selectedIdclicked:any=2545;
    contentclicked:any;

    onNodeSelected(args: NodeSelectEventArgs) {
        this.selectedIdclicked=this.selectedId;
        this.selectedId=args.nodeData.id;
        this.repo.catalogItemsRequest.catKey = Number(args.nodeData.id);
        
        //element.icon= 'fa fa-folder-open';
        //this.repo.catalogs = this.catalogs;
        //args.nodeData.icon = 'fa fa-folder-open-o';
        
        this.repo.getCatalogItems();
        this.sendMessage(this.repo.catalogItemsRequest.catKey);
    }
    
    public editing(args: NodeCheckEventArgs) {
        //check whether node is root node or not to cancel editing it
        // if (args.node.parentNode.parentNode.nodeName !== "LI") {
        //     args.cancel = true;
        // }
    }
    public onNodeEdited(args: NodeEditEventArgs): void {
         
        //-----------------------check is Deblcate
        let key=+this.selectedId;
        let obj:SysCatalog=this.find2(this.catalogs,key);
        
        if(obj.parentCatKey != 0){
            let parentObject:SysCatalog=this.find2(this.catalogs,obj.parentCatKey);
            let result = parentObject.catalogs.find(item => item.caption == args.newText.trim());
            if(result && (result.catkey != key)){
                this.notifications.create('Error', 
                'this name alredy exist', 
                NotificationType.Bare,
                 { theClass: 'outline primary', timeOut: 6000, showProgressBar: false });
                 args.cancel=true;
                return;
            }
        }else{
            let result = this.catalogs.find(item => item.caption == args.newText.trim());
           if(result && (result.catkey != key)){
                this.notifications.create('Error', 
                'this name alredy exist', 
                NotificationType.Bare,
                 { theClass: 'outline primary', timeOut: 6000, showProgressBar: false });
                 args.cancel=true;
                return;
            }
        }
        
        if (args.newText.trim() == "") {
            args.cancel=true;
        }
        else if (args.newText != args.oldText) {
        let newNode: SysCatalog = { parentCatKey: Number(args.nodeData.parentID),
            catkey: Number(args.nodeData.id), 
            caption:args.newText  }
        this.subscriptions.add(this.repo.saveCatalog(newNode).subscribe(()=>{
            this.repo.getCatalogs().subscribe(md => {
            
                this.catalogs = md.catalogsDataList;
                this.selectedIdList.forEach(element => {
                    this.changeExpanded(element);
                  });
              
                this.field = { dataSource: this.catalogs, 
                    id: 'catkey', text: 'caption', 
                    child: 'catalogs', iconCss: 'icon' };
    
            })}));
        }
        
    }
   
    public setSearch() {
        this.repo.filter.search = this.search;
        this.repo.getCatalogs().subscribe(res=>{
         
            this.catalogs = res.catalogsDataList;
            this.field = { dataSource: this.catalogs, id: 'catkey', text: 'caption', child: 'catalogs', iconCss: 'icon' };
            this.selectedIdList.forEach(element => {
                this.changeExpanded(element);
              });

        });

    }
    message: string = "Hello!"

    @Output() messageEvent = new EventEmitter<string>();
    sendMessage(catKey:any) {
        this.messageEvent.emit(catKey)
      }

    //change expanded
    changeExpanded(selectedId:any)
    {
         
        if(selectedId != undefined){
            let key=+selectedId;
            let findedObject:SysCatalog=this.find2(this.catalogs,key);
            if(findedObject != undefined){
                if(findedObject.parentCatKey != 0){
                    findedObject.expanded =true;
                    this.changeExpanded(findedObject.parentCatKey)
                }else{
                    findedObject.expanded =true;
                } 
            }
          
        }
       
        
    }

    hover(catKey,content){
        this.content=content;
        this.selectedId=catKey;
    }

    ResetSelectedCat(){
        this.selectedIdclicked=undefined;
        this.selectedId=undefined;
    }
    onNodeExpanded(args: NodeEditEventArgs){
          this.selectedIdList.push(Number(args.nodeData.id));
    }

    onNodeExpanded2(args: NodeEditEventArgs){
        let ListOfCat= this.catalogsDataList.filter(x=>x.parentCatKey == args.nodeData.id);
       let ListOfCatKeyChildren=[];
       ListOfCatKeyChildren.push(Number(args.nodeData.id));
       
       ListOfCat.forEach(element => {
       ListOfCatKeyChildren.push(element.catkey);
       });
       ListOfCatKeyChildren.forEach(element => {
        this.selectedIdList=this.selectedIdList.filter(x=>x !=  element);
       });
       
    

}

close() {
    this.modalService.dismissAll();
  
  }

  DeleteCataloge(){
      if(this.selectedId != 2545){
        this.repo.DeleteCatalog(this.selectedId).subscribe((res:any)=>{
            if(res.success){
              this.repo.getCatalogs().subscribe(md => {
                  this.catalogs = md.catalogsDataList;
                  this.field = { dataSource: this.catalogs, id: 'catkey', text: 'caption', child: 'catalogs', iconCss: 'icon',selected: 'isSelected' }; 
                  this.selectedIdList.forEach(element => {
                      this.changeExpanded(element);
                      this.modalService.dismissAll();
                    });
              })
            }
        })
      }else{
        this.toastr.warning(this.translateService.instant('catalog.validationDelete'), 'Warnning');
      }
  }

  GetAllCatalog(){
      this._CatalogService.GetAllCatalog().subscribe((res:any)=>{
          this.catalogsDataList=res.catalogsDataList;
      })
  }
}
