import { Component, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal-esc',
  templateUrl: './modal-esc.component.html',
})
export class ModalEscComponent {
  modalRef: BsModalRef;
  config = {
    keyboard: true
  };
  constructor(private modalService: BsModalService) { }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }
}
