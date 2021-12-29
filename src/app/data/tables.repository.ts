import Helper from "../../utilities/helper";
import { TableData } from '../../models/requests/tableDataRequest';
import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { SysTable } from '../../models/responses/systable';
import { Filter } from './configClasses.repository';
import { ColumnData } from '../../models/requests/columnDataRequest';
import { ColumnRequest } from "../../models/requests/ColumnRequest";


const tablesUrl = Helper.baseUrl + "api/v1/tables/";
type tablesMetadata = {
  tablesDataList: SysTable[]
}
type columnsMetadata = {
  columnsDataList: ColumnData[]
}
export type ReponseDataModel = {
  data: any ,
  succeeded: boolean,
  errors: string[],
  message: string
}
@Injectable({
  providedIn: 'root'
})
export class TablesRepository {
  constructor(private http: HttpClient) {
  }
  showBehavior:boolean=false;
  table: SysTable = {};
  columnsMetaData: columnsMetadata;
  entityClicked: SysTable = {};
  tables: SysTable[] = [];
  
  columns: ColumnData[] = [];
  filter: Filter = new Filter();
  columnReq: ColumnRequest = new ColumnRequest();
  showForm: boolean = false;
  showFields: boolean = false;
  showSidebar: boolean = false;
  showInfoForm: boolean = false;
  showDataSheet: boolean = false;
  showNav: boolean = false;
  entityIsClicked: boolean = false;
  showTableDataSheet:boolean=false;
  showinfoDataSheet:boolean=false;
  showSectionDataSheet:boolean=false;
  TableLayoutDataSheet:boolean=false;
  columnRequest: ColumnData = {};
  messageResponse: string = "";
  getTables(): Promise<tablesMetadata> {
    let url = tablesUrl + "GetAllTables";
    if (this.filter.search) {
      url += `?search=${this.filter.search}`;
    }
    return this.http.get<tablesMetadata>(url)
      .toPromise<tablesMetadata>()
      .then(md => {
        this.tables = md.tablesDataList;
       //console.log(this.tables);
        //this.table = md.tablesDataList[0];
        return md;
      });

  }
  getColumns(): Promise<ReponseDataModel> {
    let url = tablesUrl + "GetAllColumns";
    if (this.columnReq.search) {
      url += `?search=${this.columnReq.search}`;
    }
    this.columnReq.tkey = this.table.tableKey;
    return this.http.post<ReponseDataModel>(url, this.columnReq)
      .toPromise<ReponseDataModel>()
      .then(md => {
        this.columnsMetaData = md.data;
        this.columns = this.columnsMetaData.columnsDataList;
        return md;
      });

  }
  createTable(table: TableData): string{
    let url = tablesUrl + "SaveTable";
    this.http.post<ReponseDataModel>(url, table)
      .subscribe(res => {
        this.messageResponse = res.message;
        this.getTables();
      });
    return this.messageResponse;
  }
  deleteTable(tableKey: number): string {
    let url = tablesUrl + "DeleteTable";
    this.http.delete<ReponseDataModel>(`${url}/${tableKey}`)
      .subscribe(res => {
        this.messageResponse = res.message;
        this.getTables()
      });
    return this.messageResponse;

  }
  deleteColumn(ckey: number) {
    let url = tablesUrl + "DeleteColumn";
    this.http.delete<ReponseDataModel>(`${url}/${ckey}`)
      .subscribe(res => {
        this.messageResponse = res.message;
      });
    return this.messageResponse;
  }
  setTable(table: SysTable) {
    this.table = table;
  }
  setEntityClicked(entity: SysTable) {
    this.entityClicked = entity;
  }
  checkCaptionExists(caption: string): any {
    this.tables.forEach(t => { if (t.caption === caption) return true; });
    return false
  }
  saveColumn() {
    let url = tablesUrl + "SaveColumn";
    this.http.post<ReponseDataModel>(url, this.columnRequest)
      .subscribe(res => {
        this.messageResponse = res.message;
        console.log('res',res);
      });
    return this.messageResponse;
  }

}
