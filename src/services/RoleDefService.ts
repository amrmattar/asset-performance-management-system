
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Result } from 'src/models/responses/Result';
import Helper from 'src/utilities/helper';
import UsersUtility from 'src/utilities/userutility';
@Injectable()
export class RoleDefService {
  constructor(private _httpClient: HttpClient) { }
  
  GetRoleDefByTableKey(tableKey:any):Observable<any>{
    let params = new HttpParams();
    params = params.append('tableKey', tableKey);
    return this._httpClient.get<Result>(environment.apiUrl + "/api/v1/RoleDef/GetRoleDefByTableKey", { 
      params: params});
  } 

  SaveRoleDef(SecRoleDef : any,tableKey:any):Observable<any>{
     
    let params = new HttpParams();
    params = params.append('tableKey', tableKey);
    return this._httpClient.post<any>(environment.apiUrl + "/api/v1/RoleDef/SaveRoleDef", SecRoleDef, {  params: params});
  } 

    
  GetTablesByRoleKey(RoleKey:any):Observable<any>{
    let params = new HttpParams();
    params = params.append('RoleKey', RoleKey);
    return this._httpClient.get<any>(environment.apiUrl + "/api/v1/RoleDef/GetTablesByRoleKey", { 
      params: params});
  }

}
