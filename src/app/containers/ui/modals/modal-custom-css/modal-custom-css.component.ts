import { Component, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal-custom-css',
  templateUrl: './modal-custom-css.component.html',
})
export class ModalCustomCssComponent {
  modalRef: BsModalRef;
  constructor(private modalService: BsModalService) { }

  openModalWithClass(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
  }
}
