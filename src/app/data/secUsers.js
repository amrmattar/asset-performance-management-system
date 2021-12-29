"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SecUsers {
    constructor(Ukey, Uid, Upkey, UserName, Password, IsActive, IsSuper, IsLdap, QueryPermission, LastLogin, CreatedBy, CreatedDate, ModifiedBy, ModifiedDate, OrgKey) {
        this.Ukey = Ukey;
        this.Uid = Uid;
        this.Upkey = Upkey;
        this.UserName = UserName;
        this.Password = Password;
        this.IsActive = IsActive;
        this.IsSuper = IsSuper;
        this.IsLdap = IsLdap;
        this.QueryPermission = QueryPermission;
        this.LastLogin = LastLogin;
        this.CreatedBy = CreatedBy;
        this.CreatedDate = CreatedDate;
        this.ModifiedBy = ModifiedBy;
        this.ModifiedDate = ModifiedDate;
        this.OrgKey = OrgKey;
    }
}
exports.SecUsers = SecUsers;
//# sourceMappingURL=secUsers.js.map