import { Component, Input } from '@angular/core';
import { SitesData } from '../../../../models/responses/sitesDataResponse';
import { SitesRepository } from '../../../data/sitesRepository';
import { UsersComponent } from '../Users/users.component';
import { UserSitesComponent } from '../userSites/user.sites.component';


@Component({
  selector: 'add-site',
  templateUrl: './add.site.html',
  styleUrls: ['./add.site.scss'],
})
export class AddSiteComponent {
  @Input() selectedObject: SitesData = {};
  userSites: SitesData[] = [];
  ExisteingFlag:any=false;
  public unique_key: number;
  public parentRef: UserSitesComponent;
  constructor(private repo: SitesRepository,private _UsersComponent:UsersComponent) {
    
  }
  get sites(): SitesData[] {
    console.log("sites",this.repo.sites);
    return this.repo.sites;
  }
 

  selectChangeHandler(obj) {
 
let exists;
if(this.repo.dynamicUserSites == null){
  exists=false;
}else{
  let element=this.repo.dynamicUserSites.find(x=>x.skey == obj.skey)
if(element != null){
exists = true;
}
}

if(exists == true){
  this._UsersComponent.ChangeFlagDisable();
  this.ExisteingFlag=true;
}else{
  this.ExisteingFlag=false;
  this._UsersComponent.ChangeFlagEnable();
    if (this.repo.dynamicUserSites == undefined) {
      this.repo.dynamicUserSites = [];
    }
    if (obj != null) {
      obj= this.repo.sites.find(x=>x.skey == obj.skey);
      this.repo.dynamicUserSites.push(obj);

    }
}

  }
  remove_me() {
     
    this.parentRef.remove(this.unique_key);
    this._UsersComponent.ChangeFlagEnable();
  }

}
