import { Component, Input, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { LdabDataService } from 'src/services/ldab-data.service';

@Component({
  selector: 'app-ldab',
  templateUrl: './ldab.component.html',
  styleUrls: ['./ldab.component.scss']
})
export class LdabComponent implements OnInit {
  clickEventSubscription:Subscription;
  tabname: any= 'aaa';
  constructor(private Ldabdataservice:LdabDataService) {
    this.Ldabdataservice.gettabInfo().subscribe(info => {
      this.tabname = info;
    });
    this.Ldabdataservice.getcaptionInfo().subscribe(info => {
      this.tabname = 'Add New';
    });
   }

  ngOnInit(): void {
  }


}
