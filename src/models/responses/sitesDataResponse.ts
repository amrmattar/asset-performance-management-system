import { UserData } from "src/app/models/responses/userDataResponse";

export class SitesData {
  constructor(
    public id?:any,
    public skey?: number,
    public name?: string,
    public orgKey?: number,
    public unique_key?:number,
    public listOfSites?:any,
    public SiteUsers?:UserData[]

  ) { }
}
