import { Injectable } from '@angular/core';
import Helper from '../utilities/helper';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { PagginationRequest } from 'src/models/requests/PagginationRequest';
import { Result } from 'src/models/responses/Result';
import UsersUtility from 'src/utilities/userutility';

@Injectable({
  providedIn: 'root'
})
export class CatalogService {
  constructor(private _httpClient: HttpClient) {
   }
  
  GetCatalogsPaggination(pagginationRequest: PagginationRequest):Observable<Result> {
    return this._httpClient.post<Result>(environment.apiUrl+"/api/v1/catalogs/GetCatalogsPaggination", pagginationRequest);
  } 

  GetAllCatalog():Observable<Result> {
    return this._httpClient.get<Result>(environment.apiUrl+"/api/v1/catalogs/GetAllCatalog");
  } 
}
