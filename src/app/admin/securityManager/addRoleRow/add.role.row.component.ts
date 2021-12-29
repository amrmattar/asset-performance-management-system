import { Component, Input, TemplateRef, ViewChild, EventEmitter, Output } from '@angular/core';
import { Repository } from '../../../data/repository';
import { UserData } from '../../../../models/responses/userDataResponse';
import { SiteUsersComponent } from '../siteUsers/site.users.component';
import { roleUsersDataRequest } from '../../../../models/requests/userRolesDataRequest';
import { RolesRepository } from '../../../data/roleRepository';
import { RolesData } from '../../../../models/responses/rolesDataResponse';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';


@Component({
  selector: 'add-role-row',
  templateUrl: './add.role.row.component.html'
})
export class AddRoleRowComponent {
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
  roleUsersDataRequest: roleUsersDataRequest = {};
 // @Output() save: EventEmitter<any> = new EventEmitter<any>();
  constructor(private repo: Repository, private roleRepo: RolesRepository,private modalService: BsModalService) {
    this.repo.getUsers();
    //this.roleRepo.dynamicRoleUsers = this.users;

  }
  get users(): UserData[] {
    return this.repo.users;
  }
  get roleUsers(): UserData[] {
    return this.roleRepo.roleUsers;
  }
  get role(): RolesData {
    return this.roleRepo.roleRequest;
  }
  set roleUsers(value: UserData[]) {
    this.roleRepo.roleUsers = value;
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
    console.log('obj', obj);
    this.selectedObject = obj;
  }
  remove_me() {
  }
  show() {
    this.modalRef = this.modalService.show(this.template, this.config);
  }
  addRow() {
    this.roleUsers.push(this.selectedObject);
    console.log('roleKey', this.role.roleKey,);
    this.roleUsersDataRequest = { roleKey: this.role.roleKey, roleUsers: this.roleUsers }
    this.roleRepo.saveRoleUsers(this.roleUsersDataRequest);
    console.log('roleUsers', this.roleUsers);
  }
}
