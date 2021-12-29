import { Component, Input, AfterViewInit, ViewChild, OnInit, AfterViewChecked, ElementRef, TemplateRef, Injectable, ChangeDetectorRef,AfterContentChecked } from '@angular/core';
import timezones from 'timezones-list';
import *  as data from '../../../data/language-culture-names-list.json';
import { Repository } from '../../../data/repository';
import { SitesData } from '../../../../models/responses/sitesDataResponse.js';
import { UomcSetsData } from '../../../../models/responses/uomcSetsDataResponse.js';
import { UserData } from '../../../../models/responses/userDataResponse.js';
import { NgForm } from '@angular/forms';
import { ModalConfirmComponent } from '../../../containers/ui/modals/modal-confirm/modal-confirm.component.js';
import { environment } from 'src/environments/environment';
import { UsersComponent } from '../Users/users.component';
import { DropzoneComponent } from 'src/app/containers/dropzone/dropzone.component';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import { SharedataService } from '../service/sharedata.service';
import csc from 'countries-states-cities'
@Component({
  selector: 'user-form',
  styleUrls: ['./user.form.component.scss'],
  templateUrl: './user.form.component.html',
})
export class UsersFormComponent implements OnInit {
  public config: PerfectScrollbarConfigInterface = {};
  @ViewChild('myInput')
  myInputVariable: ElementRef;

  @ViewChild('userImage', { static: true }) upload: DropzoneComponent;
  public response: { dbPath: '' };
  cultures: any = (data as any).default;
  userDataList: UserData[];
  users: UserData[];
  timezone = '';
  placeholderString = 'Select timezone';
  timezonesList: [];
  
  InvalidPasswordFlag:boolean=false;
  constructor(
    private sharedService:SharedataService,
    public repo: Repository,
    private _UsersComponent: UsersComponent,
    private cdref: ChangeDetectorRef
  ) {
    this.users = this.repo.users;
    this.timezonesList = timezones;
    this.timezone = this.getTimeZone();
    var userTimezone = timezones.find((obj) => obj.utc == this.timezone);
  }
  ngOnInit(){
    this.repo.getCountries();
  
  }
  modelChangedCountry(newObj) {
    this.repo.getStatesOfCountry(Number(this.user.country));
}
modelChangedCity(newObj){
  this.repo.getcitesBystateId(Number(this.user.state));
}

get countryList(){
 return this.repo.countryList;
}
get sitesList(){
  return  this.repo.sitesList
}

get CitiesList(){
  return  this.repo.CitiesList
}
  ngAfterContentChecked() {

    this.cdref.detectChanges();

  }
  saveUser() {
    //this.user.imagePath = this.response.dbPath;
    //this.repo.saveUser(this.user);
    // this.repo.getUsers();
  }
  /*
  deleteUser(template: TemplateRef<any>) {
    this.dialogRef.openModal(template);
   // this.repo.deleteUser(this.user.uId);
  }*/
  getTimeZone() {
    var offset = new Date().getTimezoneOffset(),
      o = Math.abs(offset);
    return (
      (offset < 0 ? '+' : '-') +
      ('00' + Math.floor(o / 60)).slice(-2) +
      ':' +
      ('00' + (o % 60)).slice(-2)
    );
  }
  get sites(): SitesData[] {
    return this.repo.sites;
  }
  get user(): UserData {
    return this.repo.user;
  }
  set user(userData: UserData) {
    this.repo.setuser(userData);
  }
  get usernameIsExist(): boolean {
    return this.repo.usernameIsExist;
  }
  get emailIsExist(): boolean {
    return this.repo.emailIsExist;
  }
  set setUsernameIsExist(usernameisexist: boolean) {
    this.repo.setUsernameIsExist(usernameisexist);
  }
  set setEmailIsExist(emailIsExist: boolean) {
    this.repo.setEmailIsExist(emailIsExist);
  }
  get uomcs(): UomcSetsData[] {
    return this.repo.uomcs;
  }
  setUserTimeZone(val) {
    // if (val != null) {
    this.user.timeZone = val;
  }
  setUserUom(val) {
    if (val != 0) {
      this.user.uom = val;
    } else {
      this.user.uom = 1;
    }
  }
  setUserCulture(val) {
    if (val != null) {
      this.user.culture = val;
    } else {
      this.user.culture = [...this.cultures].shift();
    }
  }
  changeTimezone(timezone) {
    this.timezone = timezone;
  }
  public resetForm(form: NgForm) {
    this.repo.setuser({});
    form.reset();
  }
  checkUserNameExists() {
     
    this.repo.usernameIsExist = false;
    let Exist= this.users.find(x=>x.userName==this.user.userName)
    if (Exist != null && this.user.uId == null) {
      this.repo.usernameIsExist= true;
   } else {
    this.repo.usernameIsExist = false;
   }
  }
  checkEmailExists() {
     
    this.repo.emailIsExist = false;
   let Exist= this.users.find(x=>x.email==this.user.email)
   if (Exist != null && this.user.uId == null) {
    this.repo.emailIsExist = true;
  } else {
    this.repo.emailIsExist = false;
  }
  }
  public uploadFinished = (event) => {
     
    this.response = event;
    this.user.imagePath = this.response.dbPath;
    this._UsersComponent.ChangeFlagEnable();
  };
  public createImgPath = (serverPath: string) => {
    if (serverPath == undefined) {
      return './assets/img/Avatar.jpg';
    } else {
      return environment.apiUrl + `/${serverPath}`;
    }
  };

  MakeButtonEnable() {
     
    this._UsersComponent.ChangeFlagEnable();
    
  }
  pattern: any;
  length: any;
 
  TestRegex() {
     
    let testRegex=this.user.password.match("([A-Za-z]+[0-9]|[0-9]+[A-Za-z])[A-Za-z0-9]*")
    if((testRegex != null) && (this.user.password.length > 8)){
      this.repo.InvalidPasswordFlag=false;
   
    }else{
      this.repo.InvalidPasswordFlag=true;
    }
  }
  resetPattern() {
     
    this.pattern = '';
    this.length = '';
    this.sharedService.sendClickEvent();
  }
}
