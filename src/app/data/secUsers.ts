import { Guid } from 'guid-typescript';

export class SecUsers {
  constructor(
    public Ukey?: number,
    public Uid?: Guid,
    public Upkey?: number,
    public UserName?: string,
    public Password?: string,
    public IsActive?: boolean,
    public IsSuper?: boolean,
    public IsLdap?: boolean,
    public QueryPermission?: number,
    public LastLogin?: Date,
    public CreatedBy?: number,
    public CreatedDate?: Date,
    public ModifiedBy?: number,
    public ModifiedDate?: Date,
    public OrgKey?: number) {

  }
}
