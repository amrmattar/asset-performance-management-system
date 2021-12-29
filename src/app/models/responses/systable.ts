import { Guid } from 'guid-typescript';
//export interface SysTable {
//  tableKey?: number;
//  ptableKey?: number;
//  uid?: Guid;
//  caption?: string;
//  uri?: string;
//  description?: string;
//  isManagedByProduct?: boolean;
//  isActive?: boolean;
//  isWorkflowEnabled?: boolean;
//  isEsclationEnabled?: boolean;
//  isSiteFilterEnable?: boolean;
//  dbtableId?: string;
//  tableId?: string;
//  dbviewId?: string;
//  projectPath?: string;
//  orgKey?: number;
//  ttype?: any;
//  createdBy?: number;
//  createdDate?: Date;
//  modifiedBy?: number;
//  modifiedDate?: Date;
//  tables?: SysTable[];
//}

export class SysTable {
  constructor(
    public tableKey?: number,
    public ptableKey?: number,
    public uid?: Guid,
   public caption?: string,
    public uri?: string,
    public description?: string,
    public isManagedByProduct?: boolean,
    public isActive?: boolean,
    public isWorkflowEnabled?: boolean,
    public isEsclationEnabled?: boolean,
    public isSiteFilterEnable?: boolean,
    public dbtableId?: string,
    public tableId?: string,
    public dbviewId?: string,
    public projectPath?: string,
    public orgKey?: number,
    public ttype?: any,
    public createdBy?: number,
    public createdDate?: Date,
    public modifiedBy?: number,
    public modifiedDate?: Date,
    public jsonTxt?:any,
    public tables?: SysTable[]
             ) { }
}

export class TableIds{
  public tableKey?: number;
  public ptableKey?: number;
}