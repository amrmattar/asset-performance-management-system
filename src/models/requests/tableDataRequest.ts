import { Guid } from "guid-typescript";


export class TableData {
  constructor(
    public tableKey?: number,
    public pTableKey?: number,

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
    public dbviewId?:string,
    public projectPath?: string,
    public orgKey?: number,
    public ttype?: any,
    public createdBy?: number,
    public modifiedBy?: number,
    public createdDate?: Date,
    public jsonTxt?: string,

             ) { }
}
