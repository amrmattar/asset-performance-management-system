import { Component, Input } from '@angular/core';
import { RolesData } from '../../../../models/responses/rolesDataResponse';
import { RolesRepository } from '../../../data/roleRepository';
import { UserRolesComponent } from '../userRoles/user.roles.component';
import { UsersComponent } from '../Users/users.component';


@Component({
  selector: 'add-role',
  templateUrl: './add.role.html',
  styleUrls: ['./add.role.scss']
})
export class AddRoleComponent {
  @Input()
  selectedObject: RolesData;
  ExisteingFlag:boolean=false;
  //userRoles: RolesData[] = [];
  public unique_key: number;
  public parentRef: UserRolesComponent;
  constructor(private repo: RolesRepository,private _UsersComponent:UsersComponent) {
  }
  get roles(): RolesData[] {
    return this.repo.roles;
  }

  get userRoles(): RolesData[] {

    return this.repo.userRoles;
  }
  set userRoles(value: RolesData[]) {
    this.userRoles = value;
  }
  selectChangeHandler(obj) {
 
let exists;
if(this.repo.dynamicUserRoles == null){
  exists=false;
}else{
  let element=this.repo.dynamicUserRoles.find(x=>x.roleKey == obj.roleKey);
  
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
    if (this.repo.dynamicUserRoles == undefined) {
      this.repo.dynamicUserRoles = [];
    }
    if (obj != null) {
      obj= this.repo.roles.find(x=>x.roleKey == obj.roleKey);
      this.repo.dynamicUserRoles.push(obj);
    }
  }

  }
  remove_me() {
     
    this.parentRef.remove(this.unique_key);
    this._UsersComponent.ChangeFlagEnable();
  }

}
