import { OnInit, Component } from '@angular/core';
import { MenuItemModel } from '@syncfusion/ej2-angular-navigations';
import { CatalogService } from 'src/services/CatalogService';
import { Pager2Service } from 'src/services/Pager2Service';

@Component({
  selector: 'catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss'],
  providers: [CatalogService,Pager2Service],
  
})
export class CatalogComponent implements OnInit {

  constructor() {
 
  }
  ngOnInit(): void {
  }
  message:string;

  receiveMessage($event) {
    this.message = $event
  }
}
