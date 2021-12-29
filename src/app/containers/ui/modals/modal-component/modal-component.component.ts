import { Component, OnInit } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ModalInnerComponent } from './modal-inner-component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-modal-component',
  templateUrl: './modal-component.component.html'
})
export class ModalComponentComponent implements OnInit {
  bsModalRef: BsModalRef;
  constructor(private modalService: BsModalService, private translateService: TranslateService) { }

  openModalWithComponent() {
    const initialState = {
      list: [
        '...',
        '..'
      ],
      title: this.translateService.instant('modal.modal-title')
    };
    this.bsModalRef = this.modalService.show(ModalInnerComponent, { initialState });
    this.bsModalRef.content.closeBtnName = this.translateService.instant('modal.close');
  }

  ngOnInit() {
  }

}

