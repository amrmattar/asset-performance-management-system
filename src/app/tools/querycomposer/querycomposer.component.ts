import { Component, OnInit } from '@angular/core';
import { TabsComponent } from './taps/tabs.component';
@Component({
  selector: 'app-querycomposer',
  templateUrl: './querycomposer.component.html',
  styleUrls: ['./querycomposer.component.scss']
})
export class QuerycomposerComponent implements OnInit {
  public headerText: Object = [{ text: 'Design' }, { text: 'SQL' }, { text: 'Results' }, { text: 'VB.Net' },
    { text: 'Xamarin' }, { text: 'ASP.NET' }, { text: 'ASP.NET MVC' }, { text: 'JavaScript' }];
  constructor() { }

  ngOnInit(): void {
  }
  onbeforeActive(event) 
  { 
      if(event.activeIndex!=0) 
          event.cancel=true;    
  } 
}
