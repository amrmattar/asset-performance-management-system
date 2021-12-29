import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { SharedataService } from 'src/app/admin/securityManager/service/sharedata.service';
import { RelationshipService } from 'src/services/RelationshipService';

@Component({
  selector: 'app-relation-nav',
  templateUrl: './relation-nav.component.html',
  styleUrls: ['./relation-nav.component.scss']
})
export class RelationNavComponent implements OnInit {
  clickEventSubscription:Subscription;
  Information:boolean=true;
  Definition:boolean=false
  constructor(private sharedService:SharedataService,private _RelationshipService : RelationshipService) { 
    
    this.clickEventSubscription= this.sharedService.getClickEvent().subscribe(()=>{
      this.incrementCount();
    })
  }

  ngOnInit(): void {
  }

  onTabClick(){

  }
  incrementCount(){
    //ng-class
    console.log("tyfhyrfurbvbukftk")
    // this.count++;
    this.Information=true;
    this.Definition=false;
  
  }
  setRelationInfo(){
    this._RelationshipService.showRelationshipForm = true;
    this._RelationshipService.showDefGrid = false;
    this._RelationshipService.showDefForm = false;
    this._RelationshipService.showDefRelation = false;
    this.Information=true;
    this.Definition=false;
  }
  setRelationDef(){
    this._RelationshipService.showRelationshipForm = false;
    this._RelationshipService.showDefGrid = true;
    this._RelationshipService.showDefRelation = true;
    this._RelationshipService.showDefForm = false;
    this.Information=false;
    this.Definition=true;
  }
}
