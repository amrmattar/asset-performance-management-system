import { Component, Input, ViewContainerRef, ViewChild, ComponentFactoryResolver, OnInit, ComponentRef, TemplateRef } from '@angular/core';
import { SitesRepository } from '../../../data/sitesRepository';
import { UserData } from '../../../../models/responses/userDataResponse';
import { EventEmitterService } from '../../../../services/event-emitter.service';
import { Repository } from '../../../data/repository';
import { SelectionType, DatatableComponent, ColumnMode } from '@swimlane/ngx-datatable';
import { SitesData } from '../../../../models/responses/sitesDataResponse';
import { siteUsersDataRequest } from '../../../../models/requests/UserSitesDataRequest';

import { AddSiteRowComponent } from '../addSiteRow/add.site.row.component';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
/*export interface UserType{
  uKey: number;
  firstName: string;
  middleName: string;
  lastName: string;
}*/
@Component({
  selector: "site-users",
  templateUrl: "./site.users.component.html"
})
export class SiteUsersComponent implements OnInit{
    [x: string]: any;
  //child_unique_key: number = 0;
  //componentsReferences: Array<ComponentRef<AddRowComponent>> = [];
  public search: string;
  @ViewChild(DatatableComponent) table: DatatableComponent;
  columns = [
    { prop: 'firstName', name: 'FirstName' },
    { prop: 'userName', name: 'userName' },
    { prop: 'uKey', name: 'UKey' },

  ];
  editing = {};
  ColumnMode = ColumnMode;
  temp = [...this.users];
  itemsPerPage = 10;
  itemOptionsPerPage = [5, 10, 20];
  selected = [];
  SelectionType = SelectionType;
  selectAllState = '';
  siteUsersDataRequest: siteUsersDataRequest = {};
  modalRef: BsModalRef;

  //@ViewChild("viewContainerRef", { read: ViewContainerRef })
  //VCR: ViewContainerRef;
  @ViewChild('addNewModalRef', { static: true }) addNewModalRef: AddSiteRowComponent;
  constructor(private repo: SitesRepository, private userRepo: Repository, private modalService: BsModalService/*, private CFR: ComponentFactoryResolver,
    private eventEmitterService: EventEmitterService*/) {
  }
  ngOnInit(): void {
  /*  if (this.eventEmitterService.subsVar == undefined) {
      this.eventEmitterService.subsVar = this.eventEmitterService.
        invokeCreateRowComponentFunction.subscribe((name: string) => {
          this.createComponent();
        });
    }*/
    this.repo.getSiteUsers();


  }

  showAddNewModal() {
    this.addNewModalRef.show();
  }
  public setSearch() {
    this.repo.filter.search = this.search;
    this.repo.getSiteUsers();

  }
  get users(): UserData[] {
    return this.repo.siteUsers;
  }
  set users(value: UserData[]) {
    this.users = value;
  }
  deleteUser(user: UserData) {
    const index: number = this.users.indexOf(user);
    if (index !== -1) {
      this.users.splice(index, 1);
    }
  }
  get allUsers(): UserData[] {
    return this.userRepo.users;
  }
  get site(): SitesData {
    return this.repo.siteRequest;
  }
  updateFilter(event) {
    this.search = event.target.value.toLowerCase().trim();
    this.repo.filter.search = this.search;
    this.repo.getSiteUsers();
  }
  
  onSelect({ selected }) {
    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
    this.setSelectAllState();
  }

  setSelectAllState() {
    if (this.selected.length === this.users.length) {
      this.selectAllState = 'checked';
    } else if (this.selected.length !== 0) {
      this.selectAllState = 'indeterminate';
    } else {
      this.selectAllState = '';
    }
  }

  selectAllChange($event) {
    if ($event.target.checked) {
      this.selected = [...this.users];
    } else {
      this.selected = [];
    }
    this.setSelectAllState();
  }
  //addNewItem() {
  //  //this.users.push({ firstName: '', userName: '', uKey: 0 });
  //  //  this.users = [...this.users, { firstName: '', userName: '', uKey: 0 }];
  //  let data = new UserData();
  //  data.firstName = "reham";
  //  data.uKey = this.users.length;
  // // this.temp = [...this.temp, {}];
  //  let rowData = { ...data };
  //  this.users.push( rowData);
  //  this.users = [...this.users]
  //}
  onItemsPerPageChange(itemCount) {
    this.itemsPerPage = itemCount;
  }
  updateValue(event, cell, rowIndex) {
    this.editing[rowIndex + '-' + cell] = false;
    this.users[rowIndex][cell] = event.target.value;
    this.users = [...this.users];
  }
  deleteUsers() {
    this.siteUsersDataRequest = { sKey: this.site.skey, siteUsers: this.selected  }
    this.repo.deleteSiteUsers(this.siteUsersDataRequest);
  }
  openModal(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template, { class: 'modal-sm' });
  }
  confirm(): void {
    this.deleteUsers();
    this.modalRef.hide();
  }

  decline(): void {
    //this.message = 'Declined!';
    this.modalRef.hide();
  }
  save() {
    this.siteUsers.push(this.selectedObject);
    this.siteUsersDataRequest = { sKey: this.site.skey, siteUsers: this.siteUsers }
    this.repo.saveSiteUsers(this.siteUsersDataRequest);
  }
}
