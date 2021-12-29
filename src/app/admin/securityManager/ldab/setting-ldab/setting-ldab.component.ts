import { Component, OnInit } from '@angular/core';
import { data } from './datasource';
import { ToolbarService } from '@syncfusion/ej2-angular-grids';
import { ClickEventArgs } from '@syncfusion/ej2-angular-navigations';
@Component({
  selector: 'app-setting-ldab',
  templateUrl: './setting-ldab.component.html',
  styleUrls: ['./setting-ldab.component.scss'],
  providers: [ToolbarService],
})
export class SettingLdabComponent implements OnInit {
  public placeholder1: string = 'Every Houre';
  public placeholder2: string = '15/12/2021 15:00';
  public placeholder3: string = 'none';
  data1: Object[];
  public toolbar: any[];
  pageSettings: { pageCount: number; };
  constructor() { }

  ngOnInit(): void {
    this.data1 = data;
    this.pageSettings = {pageCount: 5};
  }

}
