import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ReponseDataModel } from 'src/app/data/tables.repository';
import { Observable } from 'rxjs';
import { userRolesDataRequest } from 'src/models/requests/userRolesDataRequest';
import Helper from 'src/utilities/helper';
import { RolesData } from 'src/models/responses/rolesDataResponse';
import { Result } from 'src/models/responses/Result';
import { RoleResponse } from 'src/models/responses/RoleResponse';
import { UserData } from 'src/models/responses/userDataResponse';
import UsersUtility from 'src/utilities/userutility';
@Injectable({
  providedIn: 'root'
})
export class RolesServeice {
  constructor(private http: HttpClient) { }
  roleRequest:any;
  entityIsClicked:boolean= false;
  roleUsers: UserData[];
  AllUsers :UserData[];
  search?:string;
  setRole(roleData: RolesData) {
    debugger;
    this.roleRequest = roleData;
  }
  saveUserRoles(userRoles: userRolesDataRequest):Observable<ReponseDataModel> {
    return this.http.post<ReponseDataModel>(environment.rolesUrl + "AddUserRoles", userRoles);
  } 
  // GetAllRoles():Observable<any>{
  //   let url = environment.rolesUrl + "GetAllRoles";
  //   if (this.search) {
  //     url += `?search=${this.search}`;
  //   }
  //   return this.http.get<any>(url, { headers});
  // } 
  // GetAllRoles():Observable<any>{
  //   let url = environment.rolesUrl + "GetAllRoles/";
  //   if (this.search) {
  //     url = environment.rolesUrl + "GetAllRoles/"+this.search;
  //   }
  //   return this.http.get<any>(url, { headers});
  // } 
  // GetAllRoles():Observable<any>{
  //   return this.http.get<any>(environment.apiUrl + "/api/v1/roles/GetAllRoles", { headers});
  // } 

  GetAllRolesSearch(search:any =null):Observable<any>{
    let params = new HttpParams();
    params = params.append('search', search);
    return this.http.get<any>(environment.apiUrl + "/api/v1/roles/GetAllRoles", { params: params});
  } 
  GetAllUsersForOneRole():Observable<any>{
    return this.http.get<any>(environment.apiUrl + "/api/v1/roles/GetRoleUsers/"+this.roleRequest.roleKey );
  } 
  CopyRole():Observable<any>{
    return this.http.get<any>(environment.apiUrl + "/api/v1/roles/CopyRole/"+this.roleRequest.roleKey);
  } 
  DeleteRole():Observable<any>{
    return this.http.get<any>(environment.apiUrl + "/api/v1/roles/DeleteRoleUsers/"+this.roleRequest.roleKey);
  } 

  AddRoleWithUsers():Observable<any>{
    return this.http.post<any>(environment.apiUrl + "/api/v1/roles/AddOrEditRoleWithUsers",this.roleRequest);
  } 
  GetUserRoles(Ukey):Observable<any>{
    return this.http.get<any>(environment.apiUrl +"/api/v1/roles/GetUserRoles/"+Ukey);
  }

   
  GetAllRoles():Observable<any>{
    return this.http.get<any>(environment.apiUrl + "/api/v1/roles/GetAllRoles");
  }
}
