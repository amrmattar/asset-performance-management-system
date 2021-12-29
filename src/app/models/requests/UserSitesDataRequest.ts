import { SitesData } from '../responses/sitesDataResponse';
import { Guid } from 'guid-typescript';
import { UserData } from '../responses/userDataResponse';

export class userSitesDataRequest{
  constructor(public userSites?: SitesData[],
    public userId?: number ) {

  }
}

export class siteUsersDataRequest {
  constructor(public siteUsers?: UserData[],
    public sKey?: number) {

  }
}
