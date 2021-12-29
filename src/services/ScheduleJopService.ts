
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';

import { scheduleJop } from 'src/models/scheduleJop';
import { Result } from 'src/models/responses/Result';
@Injectable()
export class ScheduleJopService {
  constructor(private _httpClient: HttpClient) { }
  getAll():Observable<any>{
    return this._httpClient.get<any>(environment.apiUrl + "/api/scheduleJop");
  } 
  AddscheduleJop( scheduleJop:scheduleJop):Observable<any>{
    return this._httpClient.post<any>(environment.apiUrl +"/api/scheduleJop",scheduleJop);
  } 
  markeitCancel( itemId:any,scheduleJop:scheduleJop):Observable<any>{
    return this._httpClient.put<any>(environment.apiUrl + "/api/scheduleJop",scheduleJop);
  } 

  UploadFile(formData ):Observable<Result>{
    return this._httpClient.post<any>( environment.apiUrl +"/api/scheduleJop/FileUpload", formData);
  }
  InsertList(scheduleJop:scheduleJop[]){
    return this._httpClient.post<any>(environment.apiUrl +"/api/scheduleJop/InsertList",scheduleJop);
  }
}
