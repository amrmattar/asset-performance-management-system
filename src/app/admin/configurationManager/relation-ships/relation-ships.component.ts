import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { TableIds } from 'src/models/responses/systable';
import { RelationshipService } from 'src/services/RelationshipService';

@Component({
  selector: 'app-relation-ships',
  templateUrl: './relation-ships.component.html',
  styleUrls: ['./relation-ships.component.css']
})

export class RelationShipsComponent implements OnInit,OnChanges {
  messageFromRelationInfo:any;
  messageFromRelationShip:any;
  record:any;
  @Input() messageFromCOnfSideBar: TableIds;
  @Output() messageEventFromRelationShips = new EventEmitter<any>();
  constructor(private _RelationshipService:RelationshipService) { }
  
  ngOnChanges() {
  }

  ngOnInit(): void {
  }

  get showformRel():boolean {
    return this._RelationshipService.showRelationshipForm;
  }

  get showNavbar(){
    return this._RelationshipService.showRelationshipNavbar;
  }
  
  get showRelDef(){
    return this._RelationshipService.showDefGrid;
  }

  get showDevForm(){
    return this._RelationshipService.showDefForm ;
  }

  receiveMessageRelationInfoForm($event) {
     
    this.messageFromRelationInfo = $event;
    this.sendMessageFromInfoForm(this.messageFromRelationInfo);
  }

  sendMessageFromInfoForm(message:any) {  
     
    this.messageFromRelationShip=message;
    this.messageEventFromRelationShips.emit(this.messageFromRelationShip);
  }
  selectrecord($event) {
    this.record = $event
  }


  
}
