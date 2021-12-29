import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

import {TreeNode} from 'primeng/api';
import { NodeServiceService } from 'src/app/node-service.service';
import { RelationRecordService } from 'src/services/RelationRecordService';
@Component({
  selector: 'app-record-manager-side-bar',
  templateUrl: './record-manager-side-bar.component.html',
  styleUrls: ['./record-manager-side-bar.component.scss'],
  providers:[RelationRecordService]
})
export class RecordManagerSideBarComponent implements OnInit,OnChanges {
  @Input() Rkey: number;
  recordId:string;
  captionRelationShip:string;
  numberOfRelatedTables:number;
  files1: TreeNode[];
  cols: any[];
  flagShowAllowed:any=false;
  constructor(private nodeService: NodeServiceService,
              private _RelationRecordService:RelationRecordService) { }


  ngOnChanges(): void {
    debugger
    if(this.Rkey != undefined)
   this.RecordManagerTree(this.Rkey);
  }
  ngOnInit() {
     
  }

  RecordManagerTree(Rkey:any){
    this._RelationRecordService.RecordManagerTree(Rkey)
    .subscribe((res:any)=>{
      if(res.success){
        this.flagShowAllowed=true;
        this.recordId=res.model.recordId;
        this.captionRelationShip=res.model.captionRelationShip;
        this.numberOfRelatedTables=res.model.numberOfRelatedTables;
        this.files1=res.model.treeRecordRelationLis;
      }else{
        this.flagShowAllowed=false;
      }

    })
  }
}
