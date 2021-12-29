import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import Helper from '../../utilities/helper';
import { Repository } from './repository';
import { UserData } from '../../models/responses/userDataResponse';
import { RolesData } from '../../models/responses/rolesDataResponse';
import { userRolesDataRequest, roleUsersDataRequest } from '../../models/requests/userRolesDataRequest';
import { RolesAssignmentData } from '../../models/responses/rolesAssignmentDataResponse';
import { ReponseDataModel } from './tables.repository';
import { environment } from '../../environments/environment';
import { Filter } from './configClasses.repository';



//const rolesUrl = Helper.baseUrl + "api/v1/roles/";
type rolesMetaData = {
  rolesDataList: RolesData[]
}
type userRolesMetaData = {
  userRoles: RolesData[]
}
type roleUsersMetaData = {
  roleUsers: UserData[]
}


@Injectable({
  providedIn: 'root'
})
export class RolesRepository {
  roles: RolesData[];
  //roleData: RolesData = {};
  roleRequest: RolesData = {};
  userRoles: RolesData[];
  roleUsers: UserData[];
  dynamicUserRoles: RolesData[];
  showUsers: boolean = false;
  showInfoForm: boolean = true;
  messageResponse: string = "";
  filter: Filter = new Filter();
  //dynamicRoleUsers: UserData[] = [];

  constructor(private http: HttpClient, private repo: Repository) {
  }

  getRoles(): Promise<rolesMetaData> {
    let url = environment.rolesUrl + "GetAllRoles";
    if (this.filter.search) {
      url += `?search=${this.filter.search}`;
    }
    return this.http.get<rolesMetaData>(url)
      .toPromise<rolesMetaData>()
      .then(md => {
        this.roles = md.rolesDataList;
        return md;
      });
  }
  get user(): UserData {
    return this.repo.user;
  }
  getUserRoles(): Promise<userRolesMetaData> {
    if(this.user != undefined){
      return this.http.get<userRolesMetaData>(environment.rolesUrl + `GetUserRoles/${this.user.uKey}`)
      .toPromise<userRolesMetaData>()
      .then(md => {
        this.userRoles = md.userRoles;
        this.dynamicUserRoles = md.userRoles;

        return md;
      });
    }
    
  }
  getRoleUsers(): Promise<roleUsersMetaData> {
    let url = environment.rolesUrl + `GetRoleUsers/${this.roleRequest.roleKey}`;
    if (this.filter.search) {
      url += `?search=${this.filter.search}`;
    }
    return this.http.get<roleUsersMetaData>(url)
      .toPromise<roleUsersMetaData>()
      .then(md => {
        this.roleUsers = md.roleUsers;
        return md;
      });
  }

  saveUserRoles(userRoles: userRolesDataRequest) : string {
    let url = environment.rolesUrl + "AddUserRoles";

    this.http.post<ReponseDataModel>(url, userRoles)
      .subscribe(
        res => {
          this.messageResponse = res.message;
          this.getUserRoles();
        });
    return this.messageResponse;
      
  }

  setRole(roleData: RolesData) {
    this.roleRequest = roleData;
  }
  SaveRole(role: RolesData) {
    //this.user.imagePath = this.response.dbPath;
    let url = environment.rolesUrl + "SaveRole";

    this.http.post<ReponseDataModel>(url, role)
      .subscribe(res => {
        this.messageResponse = res.message;
        this.getRoles();
      });
    return this.messageResponse;
  }
  deleteRoleUsers(roleUsersDataRequest: roleUsersDataRequest) {
    let url = environment.rolesUrl + "DeleteRoleUsers";

    this.http.post<any>(url, roleUsersDataRequest)
      .subscribe(
        () => {
          this.getRoleUsers();
        }
      );
  }
  saveRoleUsers(roleUsers: roleUsersDataRequest) {
    let url = environment.rolesUrl + "SaveRoleUsers";

    this.http.post<any>(url, roleUsers)
      .subscribe(
        () => {
          this.getRoleUsers();
        }
      );
  }
}
