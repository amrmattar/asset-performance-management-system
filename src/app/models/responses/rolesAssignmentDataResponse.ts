export class RolesAssignmentData {
  constructor(
    public roleAssignKey?: number,
    public roleKey?: number,
    public name?: string,
    public userKey?: number,
    public createdBy?: number,
    public createdDate?: Date,
    public modifiedBy?: number,
    public modifiedDate?: Date,
    public orgKey?: number

  ) { }
}
