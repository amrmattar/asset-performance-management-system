import { Component, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-modal-animation',
  templateUrl: './modal-animation.component.html',
})
export class ModalAnimationComponent {
  modalRef: BsModalRef;
  config = {
    animated: true
  };
  constructor(private modalService: BsModalService) { }

  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, this.config);
  }
}
