import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FormsModule as FormsModuleAngular, ReactiveFormsModule } from '@angular/forms';
import { NgSelectModule } from '@ng-select/ng-select';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { DropzoneModule } from 'ngx-dropzone-wrapper';

import { RatingModule } from 'ngx-bootstrap';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  declarations: [
   ],
  imports: [
    CommonModule,
    FormsModuleAngular,
    NgSelectModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    TimepickerModule.forRoot(),
    RatingModule,
    DropzoneModule,
    
    TranslateModule
  ],
  providers: [],
  exports: [

  ]
})

export class FormsContainersModule { }
