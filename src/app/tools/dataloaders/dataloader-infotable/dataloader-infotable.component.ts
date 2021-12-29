import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { TableIds } from 'src/models/responses/systable';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { scheduleJop } from 'src/models/scheduleJop';
import { SignalRService } from 'src/services/SignalRService';
import { ScheduleJopService } from 'src/services/ScheduleJopService';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { EntityService } from 'src/services/EntityService';
import { Result } from 'src/models/responses/Result';
import { environment } from 'src/environments/environment';
import { DialogComponent } from '@syncfusion/ej2-angular-popups';
import { EmitType } from '@syncfusion/ej2-base';
@Component({
  selector: 'app-dataloader-infotable',
  templateUrl: './dataloader-infotable.component.html',
  styleUrls: ['./dataloader-infotable.component.scss']
})
export class DataloaderInfotableComponent implements OnInit {
  closeResult: string;
  @Input() items: any[];
  files: File[] = [];
  _scheduleJopList:scheduleJop[];
  messageFromFromUploader:any;
  fileNamesAlreadyExists:string="";
  flagDetails:any=false;
  item:scheduleJop;
  itemView:any={};
  public targetElement: HTMLElement;
    public hidden: Boolean = false;
  @ViewChild('ejDialog1') ejDialog1: DialogComponent;
public onOpenDialog1 = function (item: any): void {

	console.log("item",item);
	this.itemView=item;
    // Call the show method to open the Dialog
    this.ejDialog1.show();
}
public hideDialog: EmitType<object> = () => {
    this.ejDialog1.hide();
}
public onOverlayClick: EmitType<object> = () => {
    this.ejDialog1.hide();
}
  constructor(private modalService: NgbModal
	,private readonly signalrService: SignalRService,
	private readonly scheduleJopService:ScheduleJopService,
	private toastr: ToastrService,
	private translateService: TranslateService,
	private _EntityService:EntityService) { 
		debugger
		this.itemView.schedualJopDetailsList=new Array;
	  this.items=new Array<any>();
	  this._scheduleJopList=new Array<scheduleJop>();
	  
                this.signalrService.itemAdded.subscribe(item => {
                  this.items = [...this.items,item ];
                  });
                  this.signalrService.itemUpdated.subscribe(item => {
					  
					 
                //   this.items = this.items.filter(x => x.id !== item.id);
                //   this.items = [item, ...this.items];
				let objIndex  = this.items.findIndex((obj => obj.id == item.id));
				this.items[objIndex]=item;
                  });
			
  }

  ngOnInit(): void {
	this.scheduleJopService.getAll().subscribe(items=>{
		console.log("items",items);
		this.items=items.model ;
	  })
  }
  markeitCancel(item: scheduleJop) {
	this.scheduleJopService.markeitCancel(item.id,item).subscribe(()=>{
	})
  }
  openLg(content3) {
	  this._scheduleJopList=[];
	  this.files=[];
		this.modalService.open(content3, { size: 'lg' });
	}


	addscheduleJop() {
	
		//this.checkFileAlreadyExist();
		this.upload(this.messageFromFromUploader);
		
	}

	receiveMessageFromUploader($event) {

		this.messageFromFromUploader = $event;
		this.messageFromFromUploader.forEach(element => {
			
		let alreadyExist=this._scheduleJopList.find(x=>x.fileName == element.name);
		if(alreadyExist == undefined || alreadyExist == null){
			let _scheduleJop=new scheduleJop();
			_scheduleJop.fileName=element.name;
			_scheduleJop.description="";
			_scheduleJop.jopType="dataLoader"
			this._scheduleJopList.push(_scheduleJop);
			
		}
			
		});

		for(let index =0 ; index < this._scheduleJopList.length; index ++){
			
			let deletedItem = this.messageFromFromUploader.find(x=>x.name == this._scheduleJopList[index].fileName);
			if(deletedItem == undefined || deletedItem == null){
				this._scheduleJopList.splice(index, 1);
			}
		}
	  }
	
	  upload(files) {
		
		if(files!=null){
		  if (files.length === 0)
			return;
		  const formData = new FormData();
		  for (let file of files){
		//  formData.append(file.name, file);
		var dateNow = new Date();  // for example
		//var ticks = ((dateNow.getTime() * 10000) + 621355968000000000);
		var extention=file.name.split('.').pop();
		var name = file.name.split(/[\\/]/g).pop().split('.')[0];
		var fileName=name+"."+extention;
		  formData.append('file', file, fileName);
		  }
		  this.modalService.dismissAll();
		  this.scheduleJopService.UploadFile(formData).subscribe((res:any)=>{
			res.model.forEach(element => {
				let schedualeJopObj= this._scheduleJopList.find(x=>x.fileName== element.fileName);
				schedualeJopObj.fileGuid =element.fileGuid;
 			});
			if(res.success){
				
				this.scheduleJopService.InsertList(this._scheduleJopList).subscribe((res)=>{
					
					if(res.success){
						this.toastr.success(this.translateService.instant('dataLoader.Success'), 'Success');
					}
					
				  })
			}
		  })
		  }
		  }

	checkFileAlreadyExist(){
		this.fileNamesAlreadyExists ="";
		this.messageFromFromUploader.forEach(element => {
			debugger;
			let alreadyExist=this.items.find(x=>x.fileName == element.name);
			if(alreadyExist != undefined){
				this.fileNamesAlreadyExists=this.fileNamesAlreadyExists+alreadyExist.fileName+" , ";
			}
				
			});
			if(this.fileNamesAlreadyExists == ""){
				this.upload(this.messageFromFromUploader);
			}else{
				this.fileNamesAlreadyExists = this.fileNamesAlreadyExists.slice(0, -1);
				this.fileNamesAlreadyExists = this.fileNamesAlreadyExists.slice(0, -1);
				this.toastr.error(this.fileNamesAlreadyExists +this.translateService.instant('dataLoader.alreadyExists'), 'error');
			}
	}
		  
	cancel(id:any){
		this._EntityService.Cancel(id).subscribe((res:Result)=>{
			if(res.success){
				this.toastr.success(this.translateService.instant('dataLoader.cancel'), 'Success');
			}
		})
	}

	selectItem(item:any){
		this.flagDetails=true;
		this.item=item;
	}

	flagBack($event) {
     
		this.flagDetails = $event
	  }

	  getfullPath(fileName:any,fileGuid:any){
		var file=fileName.split(".");
		return environment.apiUrl+"/Resources/Archive/"+file[0]+fileGuid+"/"+fileName;
	  }
	
	
}
