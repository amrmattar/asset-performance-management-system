import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Result } from 'src/models/responses/Result';
import { TableData } from 'src/models/requests/tableDataRequest';
import { RelationDataRequest } from 'src/app/models/requests/RelationDataRequest';
import { RelationShipPagginationRequest } from 'src/models/relationShip/RelationShipPagginationRequest';
import Helper from 'src/utilities/helper';
import UsersUtility from 'src/utilities/userutility';
@Injectable()
export class RelationshipService {
  showRelationShips:boolean=false;
  showRelationshipNavbar:boolean=false;
  showRelationshipForm:boolean = false;
  showRelationshipTable:boolean = false;
  ///////////////////////////////////////////////////
  showDefGrid : boolean = false;
  showDefForm : boolean = false;
  showDefRelation : boolean = false
  ////////////////////////////////////////////////////
  constructor(private _httpClient: HttpClient) { }
  // Relationship Services
  createRelationshipTable(table: TableData):Observable<any>{
    return this._httpClient.post<any>(environment.apiUrl + "/api/v1/tables/SaveRelationshipTable", table, );
  } 
  getAllRelationshipTables(search:string, tableKey):Observable<Result> {
    let params = new HttpParams();
    params = params.append('search', search);
    return this._httpClient.get<Result>(environment.apiUrl+"/api/v1/tables/GetAllRelationshipTables", {
      params: params});
  } 
  // DeleteRelationship
  deleteRelationshipTable(tableKey:any):Observable<any> {
    let params = new HttpParams();
    params = params.append('tableKey', tableKey);
    return this._httpClient.delete<any>(environment.apiUrl+"/api/v1/tables/DeleteRelationshipTable", {
      params: params});
  }
  // Relationship Def APIs
  // Save or Update Relation between 2 tables
  saveRelationshipDef(relationDef : RelationDataRequest):Observable<any>{
    return this._httpClient.post<any>(environment.apiUrl + "/api/v1/relation/SaveRelationDef", relationDef, );
  } 
  // Get All Relations 
  getRelationsDef(search:string):Observable<any>{
    let params = new HttpParams();
    params = params.append('search', search);
    return this._httpClient.get<Result>(environment.apiUrl+"/api/v1/relation/GetAllRelationDef", { 
      params: params});
  }
  // Delete RelationshipDef
  deleteRelationDef(defKey:any):Observable<any> {
    let params = new HttpParams();
    params = params.append('defKey', defKey);
    return this._httpClient.delete<any>(environment.apiUrl+"/api/v1/relation/DeleteRelation", {params: params});
  }

  GetAllRelationShipPaggination(_RelationShipPagginationRequest:RelationShipPagginationRequest):Observable<any>{
    return this._httpClient.post<any>(environment.apiUrl + "/api/v1/relation/GetAllRelationShipPaggination", _RelationShipPagginationRequest, );
  }

  GetRelationById(defKey:any):Observable<any>{
    let params = new HttpParams();
    params = params.append('defKey', defKey);
    return this._httpClient.get<any>(environment.apiUrl + "/api/v1/relation/GetRelationById", { 
      params: params});
  } 

  UpdateelationshipDef(relationDef: RelationDataRequest):Observable<any>{
    return this._httpClient.put<any>(environment.apiUrl + "/api/v1/relation/UpdateelationshipDef", relationDef, );
  } 
}











