import { Injectable } from '@angular/core';
import UsersUtility from '../utilities/userutility';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Result } from 'src/models/responses/Result';
import { TableData } from 'src/models/requests/tableDataRequest';
import { ColumnData } from 'src/models/requests/columnDataRequest';
import { ColumnRequest } from 'src/models/requests/ColumnRequest';
import { ColumnPagginationRequest } from 'src/models/requests/ColumnPagginationRequest';
import Helper from 'src/utilities/helper';
@Injectable()
export class TableService {
  constructor(private _httpClient: HttpClient) { }
  
  GetAllTablesv2(search:string,TableKey):Observable<Result> {
    let params = new HttpParams();
    params = params.append('search', search);
    params = params.append('TableKey', TableKey);
    
    return this._httpClient.get<Result>(environment.apiUrl+"/api/v1/tables/GetAllTablesV2", { 
      params: params});
  } 

  GetTableByTableKey(TableKey:any):Observable<Result> {
    let params = new HttpParams();
    params = params.append('TableKey', TableKey);
    
    return this._httpClient.get<Result>(environment.apiUrl+"/api/v1/tables/GetTableByTableKey", { 
      params: params});
  } 

  
  createTable(table: TableData):Observable<any>{
    
    return this._httpClient.post<any>(environment.apiUrl + "/api/v1/tables/SaveTable", table);
  } 

  checkTableByCaption(caption:any):Observable<Result> {
    let params = new HttpParams();
    params = params.append('caption', caption);
    
    return this._httpClient.get<Result>(environment.apiUrl+"/api/v1/tables/checkTableByCaption", { 
      params: params});
  } 

  SaveColumn(columndata: ColumnData):Observable<any>{
    
    return this._httpClient.post<any>(environment.apiUrl + "/api/v1/tables/SaveColumn", columndata);
  } 

  GetAllColumns(columnRequest:ColumnRequest):Observable<any>{
    
    return this._httpClient.post<any>(environment.apiUrl + "/api/v1/tables/GetAllColumns", columnRequest);
  } 

  GetAllColumnsPaggination(_ColumnPagginationRequest:ColumnPagginationRequest):Observable<any>{
    
    return this._httpClient.post<any>(environment.apiUrl + "/api/v1/tables/GetAllColumnsPaggination", _ColumnPagginationRequest);
  } 

  checkCaptionExists(caption:any,tkey:any):Observable<Result> {
    let params = new HttpParams();
    params = params.append('caption', caption);
    params = params.append('tkey', tkey);
    
    return this._httpClient.get<Result>(environment.apiUrl+"/api/v1/tables/checkCaptionExists", { 
      params: params});
  }
  GetColumnByCKey(ckey:any):Observable<Result> {
    let params = new HttpParams();
    params = params.append('ckey', ckey);
    
    return this._httpClient.get<Result>(environment.apiUrl+"/api/v1/tables/GetColumnByCKey", { 
      params: params});
  }
  //DeleteColumn

  DeleteColumn(columnKey:any):Observable<any> {
    let params = new HttpParams();
    params = params.append('columnKey', columnKey);
    
    return this._httpClient.delete<any>(environment.apiUrl+"/api/v1/tables/DeleteColumn", { 
      params: params});
  }

  // DeleteTable
  DeleteTable(tableKey:any):Observable<any> {
    let params = new HttpParams();
    params = params.append('tableKey', tableKey);
    
    return this._httpClient.delete<any>(environment.apiUrl+"/api/v1/tables/DeleteTable", { 
      params: params});
  }
  // GetNumericColumns
  GetNumericColumns(columnRequest:ColumnRequest):Observable<any>{
      
      return this._httpClient.post<any>(environment.apiUrl + "/api/v1/tables/GetNumericColumns", columnRequest);
    } 
    GetTablesWithTypeOne(search:string):Observable<Result> {
      let params = new HttpParams();
      params = params.append('search', search);
      //params = params.append('TableKey', TableKey);
      
      return this._httpClient.get<Result>(environment.apiUrl+"/api/v1/tables/GetTablesWithTypeOne", { 
        params: params});
    } 

    GetAllColumnsByRkey(Rkey:any):Observable<Result> {
      let params = new HttpParams();
      params = params.append('Rkey', Rkey);
      
      return this._httpClient.get<Result>(environment.apiUrl+"/api/v1/tables/GetAllColumnsByRkey", { 
        params: params});
    } 

    UpdateExistingRecord(table: TableData):Observable<any>{
      
      return this._httpClient.put<any>(environment.apiUrl + "/api/v1/tables/UpdateExistingRecord", table);
    } 

    GetAllTables(search:string):Observable<Result> {
      let params = new HttpParams();
      params = params.append('search', search);
      
      return this._httpClient.get<Result>(environment.apiUrl+"/api/v1/tables/GetAllTables", { 
        params: params});
    } 
  
    
}
