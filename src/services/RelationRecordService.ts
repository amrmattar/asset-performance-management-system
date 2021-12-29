
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import Helper from 'src/utilities/helper';
import UsersUtility from 'src/utilities/userutility';
@Injectable()
export class RelationRecordService {
  constructor(private _httpClient: HttpClient) { }
  
  RecordManagerTree(Rkey:any):Observable<any>{
    debugger
    let params = new HttpParams();
    params = params.append('Rkey', Rkey);
    return this._httpClient.get<any>(environment.apiUrl + "/api/v1/RelationRecord/RecordManagerTree", { 
      params: params});
  } 

  RecordManager(Rkey:any):Observable<any>{
    let params = new HttpParams();
    params = params.append('Rkey', Rkey);
    return this._httpClient.get<any>(environment.apiUrl + "/api/v1/RelationRecord/RecordManager", {
      params: params});
  } 

  
  GetDataPermissionByRkey(Rkey:any):Observable<any>{
    let params = new HttpParams();
    params = params.append('Rkey', Rkey);
    return this._httpClient.get<any>(environment.apiUrl + "/api/v1/RelationRecord/GetDataPermissionByRkey", {
      params: params});
  } 

  GetAllRelatedTables(Tkey:any):Observable<any>{
    let params = new HttpParams();
    params = params.append('Tkey', Tkey);
    return this._httpClient.get<any>(environment.apiUrl + "/api/v1/RelationRecord/GetAllRelatedTables", {
      params: params});
  } 


}
