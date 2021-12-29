import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { UOMService } from 'src/services/UOMService';
@Component({
  selector: 'app-uom-sidebar',
  templateUrl: './uom-sidebar.component.html',
  styleUrls: ['./uom-sidebar.component.scss']
})
export class UomSidebarComponent implements OnInit {
  public config: PerfectScrollbarConfigInterface = {};
  @Output() messageEvent = new EventEmitter<any>();
  @Input() unit:any;
  @Input() DeleteCategory:any
  btnflag:boolean=false;
  AddNew:string="";
 Search:any="";
  catSelected:string;
  uomcategoriesList:string[]
  constructor(private UOMServ:UOMService) { }
  public setSearch() {
    this.GetAllUOMCategories();
  
  }
  CopyCategory(){
    this.UOMServ.CopyCategory().subscribe((res:any)=>{  
      this.GetAllUOMCategories();
        });  
  }
  GetAllUOMCategories(){
    this.UOMServ.GetAllUOMCategories(this.Search).subscribe(
      (res)=>
      {
          this.UOMServ.UOMCategoriesList =res.model;
          this.uomcategoriesList = this.UOMServ.UOMCategoriesList;        
    })
  }
  ngOnInit(): void {
   this.GetAllUOMCategories();
   this.catSelected=undefined;

  }
  ngOnChanges() {
    if(this.unit.flag==true){
      this.GetAllUOMCategories() 
      this. deselectCategory()
      this.selectCategory(this.UOMServ.UOMCategoyResponse.uomeCateg);
      this.unit={};
    }
    else if(this.DeleteCategory.flag =true)
   {
    this.GetAllUOMCategories() 
    this. deselectCategory();
   }
  }
  AddNewCategory(){
    this.selectCategory({});
    this.AddNew="AddNew";
    this.catSelected=undefined;
    this.messageEvent.emit(this.AddNew)
    this.AddNew='';
    this.UOMServ.BaseCategoryName="";

  }
  selectCategory(category){
    this.catSelected=category;
      this.btnflag=true
    this.UOMServ.Category=category;
    this.UOMServ.BaseCategoryName=category;
    this.messageEvent.emit( this.catSelected)
  }
  deselectCategory(){
    this.catSelected=undefined;
    this.UOMServ.UOMCategoyRequest={};

    this.btnflag=false;
  this.messageEvent.emit( this.btnflag)
}

}
