import { Component, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal-change-class',
  templateUrl: './modal-change-class.component.html',
})
export class ModalChangeClassComponent {
  modalRef: BsModalRef;
  valueWidth = false;
  constructor(private modalService: BsModalService) { }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'modal-sm' })
    );
  }

  setModalClass() {
    this.valueWidth = !this.valueWidth;
    const modalWidth = this.valueWidth ? 'modal-lg' : 'modal-sm';
    this.modalRef.setClass(modalWidth);
  }
}
