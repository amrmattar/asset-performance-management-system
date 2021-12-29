import { Injectable } from '@angular/core';
import Helper from '../utilities/helper';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { UOMCategoriesResponse } from 'src/models/responses/UomCategoriesResponse';
import { UOMCategoriesRequest } from 'src/models/requests/UomCategoriesRequest';
import { UOMUnitesResponse } from 'src/models/responses/UomUnitesResponse';
import { Observable } from 'rxjs';
import { UomcSetsData } from 'src/models/responses/uomcSetsDataResponse';
import UsersUtility from 'src/utilities/userutility';
@Injectable({
  providedIn: 'root'
})
export class UOMService {
  ShowContainer:boolean = false;
  constructor(private http: HttpClient) { }
SetsList:[];
UOMCategoriesList:string[];
UOMCategoyResponse:UOMCategoriesResponse;
UOMCategoyRequest:UOMCategoriesResponse;
Unit:UOMUnitesResponse;
Category:string;
BaseCategoryName:string;
SetRequest:UomcSetsData;

GetAllUOMSets()
{
  
  return this.http.get<any>(environment.apiUrl+ "/api/v1/SysUomcSets/GetAllSets")
}
SaveSet() 
  {
    return this.http.post<any>(environment.apiUrl+ "/api/v1/SysUomcSets/SaveSet",this.SetRequest)
  }
  DeleteSet() 
  {
    return this.http.get<any>(environment.apiUrl+ "/api/v1/SysUomcSets/DeleteSet/"+this.SetRequest.uomkey)
  }
  SaveCategory() 
  {
    return this.http.post<any>(environment.apiUrl+ "/api/v1/sysUnitsOfMeasure/SaveCategory",this.UOMCategoyRequest)
  }
  GetAllUOMCategories(search:any =null):Observable<any>{
    let params = new HttpParams();
    params = params.append('search', search);
    
    return this.http.get<any>(environment.apiUrl+ "/api/v1/sysUnitsOfMeasure/GetAllUOMCategories", { params: params})
  }
  GetAllUnitesForCategory() 
  {
    
    return this.http.get<any>(environment.apiUrl+ "/api/v1/sysUnitsOfMeasure/GetAllUnitesForCategory/"+this.Category)
  }
  
  DeleteCategory() 
  {
    
    return this.http.delete<any>(environment.apiUrl+ "/api/v1/sysUnitsOfMeasure/DeleteCategory/"+this.Category)
  }
  CopyCategory():Observable<any>{
    
    return this.http.get<any>(environment.apiUrl + "/api/v1/sysUnitsOfMeasure/CopyCategory/"+this.Category);
  }
  // GetUnitesForconverstions(Category) 
  // {
  //   return this.http.get<any>(environment.apiUrl+ "/api/v1/sysUnitsOfMeasure/GetNameOfConverstin/"+Category, { headers})
  // }
  // GetUnitNameAndNotselectedUnites(uomKey) 
  // {
  //   return this.http.get<any>(environment.apiUrl+ "/api/v1/sysUnitsOfMeasure/GetUnitName/"+uomKey, { headers})
  // }
}
