"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
class SysTable {
    constructor(tableKey, ptableKey, uid, caption, uri, description, isManagedByProduct, isActive, isWorkflowEnabled, isEsclationEnabled, isSiteFilterEnable, dbtableId, tableId, dbviewId, projectPath, orgKey, ttype, createdBy, createdDate, modifiedBy, modifiedDate, tables) {
        this.tableKey = tableKey;
        this.ptableKey = ptableKey;
        this.uid = uid;
        this.caption = caption;
        this.uri = uri;
        this.description = description;
        this.isManagedByProduct = isManagedByProduct;
        this.isActive = isActive;
        this.isWorkflowEnabled = isWorkflowEnabled;
        this.isEsclationEnabled = isEsclationEnabled;
        this.isSiteFilterEnable = isSiteFilterEnable;
        this.dbtableId = dbtableId;
        this.tableId = tableId;
        this.dbviewId = dbviewId;
        this.projectPath = projectPath;
        this.orgKey = orgKey;
        this.ttype = ttype;
        this.createdBy = createdBy;
        this.createdDate = createdDate;
        this.modifiedBy = modifiedBy;
        this.modifiedDate = modifiedDate;
        this.tables = tables;
    }
}
exports.SysTable = SysTable;
//# sourceMappingURL=systable.js.map