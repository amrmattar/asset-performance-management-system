import { HttpClient } from '@angular/common/http';
import { SitesData } from '../../models/responses/sitesDataResponse';
import { Injectable } from '@angular/core';
import Helper from '../../utilities/helper';
import { Repository } from './repository';
import { UserData } from '../../models/responses/userDataResponse';
import { Guid } from 'guid-typescript';
import { userSitesDataRequest, siteUsersDataRequest } from '../../models/requests/UserSitesDataRequest';
import { environment } from '../../environments/environment';
import { ReponseDataModel } from './tables.repository';
import { Filter, Pagination } from './configClasses.repository';


//const sitesUrl = Helper.baseUrl + "api/v1/sites/";
type sitesMetaData = {
  sitesDataList: SitesData[]
}
type userSitesMetaData = {
  sites: SitesData[]
}
type siteUsersMetaData = {
  siteUsers: UserData[]
}



@Injectable({
  providedIn: 'root'
})
export class SitesRepository {
  messageResponse: string = "";
  sites: SitesData[];
  siteData: SitesData = {};
  userSites: SitesData[];
  siteUsers: UserData[];
  dynamicUserSites: SitesData[] = [];
  //dynamicSiteUsers: UserData[] = [];
  showUsers: boolean = false;
  showInfoForm: boolean = false;
  siteRequest: SitesData = {};
  filter: Filter = new Filter();
  paginationObject = new Pagination();    
  entityIsClicked: boolean = false;

  constructor(private http: HttpClient, private repo: Repository) {
  }

  getSites(): Promise<sitesMetaData> {
    return this.http.get<sitesMetaData>(environment.sitesUrl +"GetAllSites")
      .toPromise<sitesMetaData>()
      .then(md => {
        this.sites = md.sitesDataList;
        return md;
      });
  }
  get user(): UserData {
    return this.repo.user;
  }
  
  getUserSites(): Promise<userSitesMetaData> {
    //`?id=${this.repo.user.uId}`
    if(this.user.uKey != undefined){
      return this.http.get<userSitesMetaData>(environment.sitesUrl + `GetUserSites/${this.user.uKey}`)
        .toPromise<userSitesMetaData>()
        .then(md => {
           
          if(md != null){
            this.userSites = md.sites;
            this.dynamicUserSites = md.sites;
            return md;
          }
       
        });
    }
  
  }

  getUserSitesByUkey(uKey:any): Promise<userSitesMetaData> {
 
    return this.http.get<userSitesMetaData>(environment.sitesUrl + `GetUserSites/${uKey}`)
      .toPromise<userSitesMetaData>()
      .then(md => {
        this.userSites = md.sites;
        this.dynamicUserSites = md.sites;
        return md;
      });
  }
  
  
 
  getSiteUsers(): Promise<siteUsersMetaData> {
    let url = environment.sitesUrl + `GetSiteUsers/${this.siteRequest.skey}` ;
    if (this.filter.search) {
      url += `?search=${this.filter.search}`;
    }
    return this.http.get<siteUsersMetaData>(url)
      .toPromise<siteUsersMetaData>()
      .then(md => {
        this.siteUsers = md.siteUsers;
        return md;
      });
  }

  saveUserSites(userSites: userSitesDataRequest): string {
    let url = environment.sitesUrl + "AddUserSites";

    this.http.post<ReponseDataModel>(url, userSites)
      .subscribe(
        res => {
          this.messageResponse = res.message;
          this.getUserSites();
        });
    return this.messageResponse;
  }
  saveSiteUsers(siteUsers: siteUsersDataRequest) {
    let url = environment.sitesUrl + "SaveSiteUsers";

    this.http.post<any>(url, siteUsers)
      .subscribe(
        () => {
          this.getSiteUsers();
        }
      );
  }
  deleteSiteUsers(siteUsers: siteUsersDataRequest) {
    let url = environment.sitesUrl + "DeleteSiteUsers";

    this.http.post<any>(url, siteUsers)
      .subscribe(
        () => {
          this.getSiteUsers();
        }
      );
  }
  setSite(siteData: SitesData) {
    this.siteRequest = siteData;
  }
  SaveSite(site: SitesData) {
    let url = environment.sitesUrl + "SaveSite";

    this.http.post<ReponseDataModel>(url, site)
      .subscribe(res => {
        this.messageResponse = res.message;
        this.getSites();
      });
    return this.messageResponse;
  }
 
}
