import Helper from "../../utilities/helper";
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from "@angular/common/http";
import { Filter } from './configClasses.repository';
import { SysCatalog } from 'src/models/responses/syscatalog';
import { CatalogItems } from 'src/models/responses/catalogItems';
import { CatalogItemsRequest } from 'src/models/requests/catalogItemsRequest';
import UsersUtility from "src/utilities/userutility";
import { Observable } from "rxjs";
import { environment } from "src/environments/environment";


const catalogsUrl = Helper.baseUrl + "api/v1/catalogs/";
export type catalogsMetadata = {
  catalogsDataList: SysCatalog[]
}
export type catalogItemsMetadata = {
  catalogitems: CatalogItems[]
}
// type columnsMetadata = {
//   columnsDataList: ColumnData[]
// }
export type ReponseDataModel = {
  data: any ,
  succeeded: boolean,
  errors: string[],
  message: string
}
@Injectable({
  providedIn: 'root'
})
export class CatalogsRepository {
  constructor(private http: HttpClient) {
  }
  catalog: SysCatalog = {};
  entityClicked: SysCatalog = {};
  catalogs: SysCatalog[] = [];
  catalogItems: CatalogItems[] = [];
  filter: Filter = new Filter();
  catalogItemsRequest: CatalogItemsRequest = new CatalogItemsRequest();
  messageResponse: string = "";
  getCatalogItems(): Promise<catalogItemsMetadata> {
    let url = catalogsUrl + "GetCatalogItems";
    if (this.filter.search) {
      this.catalogItemsRequest.search = this.filter.search;
    }
    return this.http.post<catalogItemsMetadata>(url, this.catalogItemsRequest)
      .toPromise<catalogItemsMetadata>()
      .then(md => {
        this.catalogItems = md.catalogitems;
        console.log('catalogItems',this.catalogItems);
        return md;
      });
  }
  getCatalogs() {
    let url = catalogsUrl + "GetCatalogs";
    if (this.filter.search) {
      url += `?search=${this.filter.search}`;
    }
    const headers = new HttpHeaders({ Authorization: 'Bearer ' + UsersUtility.GetLogedInUserToken() });
    return this.http.get<catalogsMetadata>(url,{headers})

  }
  // saveCatalog(catalog: SysCatalog) {
  //   let url = catalogsUrl + "SaveCatalog";

  //  return this.http.post<any>(url, catalog)
     
  // }
  saveCatalog(catalog: SysCatalog):Observable<any> {
    return this.http.post<any>(catalogsUrl + "SaveCatalog", catalog, );
  } 

  getcatalogItemsRequest(){
   return this.catalogItemsRequest;
  }

  DeleteCatalog(CatKey:any):Observable<any>{
    let params = new HttpParams();
    params = params.append('CatKey', CatKey);
    return this.http.delete<any>(environment.apiUrl + "/api/v1/catalogs/DeleteCatalog", { 
      params: params});
  } 

}
