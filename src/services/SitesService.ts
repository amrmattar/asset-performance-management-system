import { Injectable } from '@angular/core';
import Helper from '../utilities/helper';
import { environment } from 'src/environments/environment';
import { userSitesDataRequest } from 'src/models/requests/UserSitesDataRequest';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { ReponseDataModel } from 'src/app/data/tables.repository';
import { Observable } from 'rxjs';
import { SitesData } from 'src/models/responses/sitesDataResponse';
import { UserData } from 'src/models/responses/userDataResponse';
import UsersUtility from 'src/utilities/userutility';
@Injectable({
  providedIn: 'root'
})
export class SitesService {
  constructor(private http: HttpClient) { }
  
  siteRequest: any;
  entityIsClicked:boolean= false;
  showInfoForm:boolean= false;
  siteUsers: UserData[];
  AllUsers :UserData[];
  setSite(siteData: SitesData) {
    this.siteRequest = siteData;
  }
  saveUserSites(userSites: userSitesDataRequest):Observable<ReponseDataModel> {
    
    return this.http.post<ReponseDataModel>(environment.sitesUrl+'AddUserSites', userSites);
  } 
  GetAllSitesSearch(search:any =null):Observable<any>{
    let params = new HttpParams();
    params = params.append('search', search);
    
    return this.http.get<any>(environment.apiUrl + "/api/v1/sites/GetAllSites", { params: params});
  } 
  
 
  GetAllUsersForOneSites():Observable<any>{
    
    return this.http.get<any>(environment.apiUrl + "/api/v1/sites/GetSiteUsers/"+this.siteRequest.skey);
  } 
  CopySites():Observable<any>{
    
    return this.http.get<any>(environment.apiUrl + "/api/v1/sites/CopySiteUsers/"+this.siteRequest.skey);
  } 
  DeleteSites():Observable<any>{
    
    return this.http.post<any>(environment.apiUrl + "/api/v1/sites/DeleteSiteUsers",this.siteRequest);
  } 

  AddSitesWithUsers():Observable<any>{
    
    return this.http.post<any>(environment.apiUrl + "/api/v1/sites/SaveSiteUsers",this.siteRequest);
  } 
  


  getUserSites(Ukey):Observable<any>{
    
    return this.http.get<any>(environment.apiUrl+"/api/v1/sites/GetUserSites/"+Ukey);
  } 

  GetAllSites():Observable<any>{
    
    return this.http.get<any>(environment.apiUrl+"/api/v1/sites/GetAllSites");
  }
}
