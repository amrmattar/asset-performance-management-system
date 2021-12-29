import { NgModule } from '@angular/core';
import {
  AccordionModule, AlertModule, CollapseModule, BsDropdownModule, ModalModule, PaginationModule, PopoverModule, ProgressbarModule,
   SortableModule, TabsModule, TooltipModule, TypeaheadModule, ButtonsModule
} from 'ngx-bootstrap';



@NgModule({
  declarations: [],
  imports: [
    AccordionModule.forRoot(),
    AlertModule.forRoot(),
    ButtonsModule.forRoot(),
    CollapseModule.forRoot(),
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    PopoverModule.forRoot(),
    ProgressbarModule.forRoot(),
    SortableModule.forRoot(),
    TabsModule.forRoot(),
    TooltipModule.forRoot(),
    TypeaheadModule.forRoot()
  ],
  exports: [
    AccordionModule,
    AlertModule,
    ButtonsModule,
    CollapseModule,
    BsDropdownModule,
    ModalModule,
    PaginationModule,
    PopoverModule,
    ProgressbarModule,
    SortableModule,
    TabsModule,
    TooltipModule,
    TypeaheadModule
  ]
})
export class BootstrapModule { }
