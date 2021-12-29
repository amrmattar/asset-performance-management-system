import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { User } from '../models/user';
import UsersUtility from '../utilities/userutility';
import Helper from '../utilities/helper';
import { Observable } from 'rxjs';
import { UserData } from 'src/models/responses/userDataResponse';
import { ReponseDataModel } from 'src/app/data/tables.repository';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Result } from 'src/models/responses/Result';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: Http,private _httpClient: HttpClient) { }
    login(user: User) {
      
        return this.http.post(environment.apiUrl+'/api/v1/user/login', user);
  } 

  saveUser(user: UserData):Observable<any> {
    debugger;
    
    return this._httpClient.post<any>(environment.apiUrl+"/api/v1/user/Save", user);
  } 

  GetSecurityManager():Observable<Result> {
    
    return this._httpClient.get<Result>(environment.apiUrl+"/api/v1/user/SecurityManager");
  }
  GetAllUsers():Observable<Result> {
    
    return this._httpClient.get<Result>(environment.apiUrl+"/api/v1/user/GetUsers");
  }

}
