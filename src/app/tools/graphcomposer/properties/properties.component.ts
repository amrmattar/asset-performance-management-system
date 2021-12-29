import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-properties',
  templateUrl: './properties.component.html',
  styleUrls: ['./properties.component.scss']
})
export class PropertiesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  public headerText: Object = [{ text: '1' }, { text: '2' }, { text: '3' }, { text: '4' }, { text: '5' }];
}
