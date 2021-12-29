
import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Filter } from "./configClasses.repository";
import { Observable } from "rxjs";
import { UserData } from '../../models/responses/userDataResponse';
import Helper from '../../utilities/helper';
import { SitesData } from '../../models/responses/sitesDataResponse';
import { UomcSetsData } from '../../models/responses/uomcSetsDataResponse';
import { Guid } from 'guid-typescript';
import { userSitesDataRequest } from "../../models/requests/UserSitesDataRequest";
import { userRolesDataRequest } from "../../models/requests/userRolesDataRequest";
import { environment } from '../../environments/environment';
import csc from 'countries-states-cities'
const usersUrl = Helper.baseUrl + "api/v1/user/";
//const sitesUrl = Helper.baseUrl + "api/v1/sites/GetAllSites";

type usersMetadata = {
  userDataList: UserData[],
  sitesDataList: SitesData[],
  uomcSetsDataList: UomcSetsData[]

 // categories: string[];
}
type sitesMetaData = {
  sitesDataList: SitesData[]
}
@Injectable()
export class Repository {
  InvalidPasswordFlag:boolean=false
  OldPasswordSaving:any;
  user: UserData = {};
  users: UserData[];
  sites: SitesData[];
  uomcs: UomcSetsData[];
  showForm: boolean= false;
  showSites: boolean = false;
  showRoles: boolean = false;
  editsOn: boolean = false;
  //suppliers: Supplier[] = [];
  filter: Filter = new Filter();
  usernameIsExist: boolean = false;
  emailIsExist: boolean = false;
  //categories: string[] = [];
  //public response: { dbPath: '' };
  messageResponse: string = "";
  selectedObject: UserData = {};
  entityIsClicked: boolean = false;
  countryList:any;
  sitesList:any;
  CitiesList:any;

  constructor(private http: HttpClient) {
    this.filter.related = true;
    this.countryList=new Array;
    this.sitesList=new Array;
    this.CitiesList=new Array;
  }
 
  shwoSaveFlag:boolean=false;

  getUsers(uKey:any=0): Promise<usersMetadata> {
     
    let url = usersUrl+"GetUsers";
    if (this.filter.search) {
      url += `?search=${this.filter.search}`;
    }
    //this.user = new UserData();
    return this.http.get<usersMetadata>(url)
      .toPromise<usersMetadata>()
      .then(md => {
         
        this.users = md.userDataList;
       this.sites = md.sitesDataList;
        this.uomcs = md.uomcSetsDataList;
        this.selectedObject = md.userDataList[0];
        //this.user = md.userDataList[0];
        //this.user= this.users.find(x=>x.uKey ==uKey);
        if(this.user != undefined)
        this.user.password="*********************";
        
        return md;
      });
   
  }
  getUsersSearch(): Promise<usersMetadata> {
     
    let url = usersUrl+"GetUsers";
    if (this.filter.search) {
      url += `?search=${this.filter.search}`;
    }
    this.user = new UserData();
    return this.http.get<usersMetadata>(url)
      .toPromise<usersMetadata>()
      .then(md => {
         
        this.users = md.userDataList;
       this.sites = md.sitesDataList;
        this.uomcs = md.uomcSetsDataList;
        this.selectedObject = md.userDataList[0];
        return md;
      });
   
  }

   setuser(userData: UserData) {
      
    this.user = userData;
   }
 
  setSelectedObject(userData: UserData) {
    this.selectedObject = userData;
  }
  setUsernameIsExist(usernameisexist: boolean) {
    this.usernameIsExist = usernameisexist;
  }
  setEmailIsExist(emailIsExist: boolean) {
    this.emailIsExist = emailIsExist;
  }


  saveUser(user: UserData): string {
    let url = usersUrl + "Save";
    this.http.post<number>(url, user)
      .subscribe(id => {
        user.uKey = id;
        this.messageResponse = "success";
        this.getUsers();
      });
    return this.messageResponse;

  }


  deleteUser(id: Guid) {
    let url = usersUrl + "DeleteUser";
    this.http.delete(`${url}/${id}`)
      .subscribe(() => this.getUsers());
  }

  getCountries() {
    this.countryList =csc.getAllCountries();
   }

   getStatesOfCountry(countryid){
      
    this.sitesList=csc.getStatesOfCountry(Number(countryid))
   }

   getcitesBystateId(stateId){
     
    this.CitiesList=csc.getCitiesOfState(Number(stateId))
   }

 

}
