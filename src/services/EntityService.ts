
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
@Injectable()
export class EntityService {
  constructor(private _httpClient: HttpClient) { }

  Cancel(Id:any):Observable<any>{
    let params = new HttpParams();
    params = params.append('Id', Id);
    return this._httpClient.get<any>(environment.apiUrl + "/api/v1/Entity/Cancel", { 
      params: params});
  }

}
