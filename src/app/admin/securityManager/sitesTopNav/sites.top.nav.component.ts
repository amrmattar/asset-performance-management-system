import { Component } from '@angular/core';
import { TablesRepository } from '../../../data/tables.repository';
import { SitesRepository } from '../../../data/sitesRepository';

@Component({
  selector: "sites-topnav",
  templateUrl: "./sites.top.nav.component.html"
})
export class SitesTopNavComponent {
  constructor(private repo: SitesRepository) {

  }
  setShowInfoForm() {
    this.repo.showUsers = false;
    this.repo.showInfoForm = true;
  }
  setShowUsers() {
    this.repo.showInfoForm = false;
    this.repo.showUsers = true;
  }
  get showInfoForm() {
    return this.repo.showInfoForm;
  }
  get showUsers() {
    return this.repo.showUsers;
  }
}
