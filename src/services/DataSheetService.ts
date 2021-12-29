
import { Injectable } from '@angular/core';
import UsersUtility from '../utilities/userutility';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DataSheetPagginationRequest } from 'src/models/requests/DataSheetPagginationRequest';
import { SysDatasheetVm } from 'src/models/responses/SysDatasheetVm';

import Helper from 'src/utilities/helper';
import { RecordManagerRequest } from 'src/app/models/requests/RecordManagerRequest';
@Injectable()
export class DataSheetService {
  constructor(private _httpClient: HttpClient) { }
  
  GetAllDataSheetPaggination(_DataSheetPagginationRequest:DataSheetPagginationRequest):Observable<any>{
    return this._httpClient.post<any>(environment.apiUrl + "/api/v1/DataSheet/GetAllDataSheetPaggination", _DataSheetPagginationRequest);
  }
  SaveDataSheet(DataSheet: SysDatasheetVm):Observable<any>{
    return this._httpClient.post<any>(environment.apiUrl + "/api/v1/DataSheet/SaveDataSheet", DataSheet);
  } 
  UpdateDataSheet(DataSheet: SysDatasheetVm):Observable<any>{
    return this._httpClient.put<any>(environment.apiUrl + "/api/v1/DataSheet/UpdateDataSheet", DataSheet);
  } 
  UpdateSectionOfDataSheet(DataSheet: SysDatasheetVm):Observable<any>{
    return this._httpClient.put<any>(environment.apiUrl + "/api/v1/DataSheet/UpdateSectionOfDataSheet", DataSheet);
  } 
  GetDataSheetById(dsKey:any):Observable<any>{
    let params = new HttpParams();
    params = params.append('dsKey', dsKey);
    return this._httpClient.get<any>(environment.apiUrl + "/api/v1/DataSheet/GetDataSheetById", { 
      params: params});
  } 
  DeleteDataSheet(dsKey:any):Observable<any>{
    let params = new HttpParams();
    params = params.append('dsKey', dsKey);
    return this._httpClient.delete<any>(environment.apiUrl + "/api/v1/DataSheet/DeleteDataSheet", {
      params: params});
  } 
  
  GetDataSheetsByRkey(RM:RecordManagerRequest):Observable<any>{
    debugger;
    RM.Ukey=   parseInt(localStorage.getItem("Ukey"));
    return this._httpClient.post<any>(environment.apiUrl + "/api/v1/DataSheet/GetDataSheetsByRkey",RM);
  } 

}
