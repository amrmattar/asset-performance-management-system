import { Component, Input, TemplateRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { SitesData } from '../../../../models/responses/sitesDataResponse';
import { SitesRepository } from '../../../data/sitesRepository';
import { Repository } from '../../../data/repository';
import { UserData } from '../../../../models/responses/userDataResponse';
import { SiteUsersComponent } from '../siteUsers/site.users.component';

import { siteUsersDataRequest } from '../../../../models/requests/UserSitesDataRequest';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


@Component({
  selector: 'add-site-row',
  templateUrl: './add.site.row.component.html'
})
export class AddSiteRowComponent {
  modalRef: BsModalRef;
  config = {
    backdrop: true,
    ignoreBackdropClick: true,
    class: 'modal-right'
  };
  /*@Input() selectedObject: UserData = {};*/
  public unique_key: number;
  public parentRef: SiteUsersComponent;
  @ViewChild('template', { static: true }) template: TemplateRef<any>;
  selectedObject: UserData = {};
  siteUsersDataRequest: siteUsersDataRequest = {};
 // @Output() save: EventEmitter<any> = new EventEmitter<any>();
  constructor(private repo: Repository, private siteRepo: SitesRepository,private modalService: BsModalService) {
    this.repo.getUsers();
    //this.siteRepo.dynamicSiteUsers = this.users;

  }
  get users(): UserData[] {
    return this.repo.users;
  }
  get siteUsers(): UserData[] {
    return this.siteRepo.siteUsers;
  }
  get site(): SitesData {
    return this.siteRepo.siteRequest;
  }
  set siteUsers(value: UserData[]) {
    this.siteRepo.siteUsers = value;
  }
 get user(): UserData{
    let userr = this.repo.user;
    //this.upload.showFile(userr.imagePath, this.createImgPath(userr.imagePath));
    userr.isActive = true;
    return userr;
  }
  set user(userData: UserData) {
    this.repo.setuser(userData);
  }
  selectChangeHandler(obj) {
    this.selectedObject = obj;
  }
  remove_me() {
  }
  show() {
    this.modalRef = this.modalService.show(this.template, this.config);
  }
  addRow() {
    this.siteUsers.push(this.selectedObject);
    this.siteUsersDataRequest = { sKey: this.site.skey, siteUsers: this.siteUsers }
    this.siteRepo.saveSiteUsers(this.siteUsersDataRequest);

  }
}
