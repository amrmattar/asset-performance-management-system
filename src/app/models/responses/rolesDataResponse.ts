
export class RolesData {
  constructor(
    public roleKey?: number,
    public name?: string,
    public description?: string,
    public createdBy?: number,
    public createdDate?: Date,
    public modifiedBy?: number,
    public modifiedDate?: Date,
    public orgKey?: number

  ) { }
}
