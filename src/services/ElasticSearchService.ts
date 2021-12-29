
import { Injectable } from '@angular/core';
import UsersUtility from '../utilities/userutility';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { DataSheetPagginationRequest } from 'src/models/requests/DataSheetPagginationRequest';
import { SysDatasheetVm } from 'src/models/responses/SysDatasheetVm';
import { RecordManagerRequest } from 'src/app/models/requests/RecordManagerRequest';
import Helper from 'src/utilities/helper';
import { ElasticSearchRequest } from 'src/models/requests/ElasticSearchRequest';
@Injectable()
export class ElasticSearchService {
  constructor(private _httpClient: HttpClient) { }
  Find( _ElasticSearchRequest:ElasticSearchRequest):Observable<any>{
    return this._httpClient.post<any>(environment.apiUrl + "/api/v1/ElasticSearch/Find",_ElasticSearchRequest);
  } 
  FindAll( _ElasticSearchRequest:ElasticSearchRequest):Observable<any>{
    return this._httpClient.post<any>(environment.apiUrl + "/api/v1/ElasticSearch/FindAll",_ElasticSearchRequest);
  } 
}
