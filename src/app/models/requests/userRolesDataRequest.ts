import { RolesData } from '../responses/rolesDataResponse';
import { Guid } from 'guid-typescript';
import { UserData } from '../responses/userDataResponse';

export class userRolesDataRequest{
  constructor(public userRoles?: RolesData[],
    public userId?: number ) {

  }
}
export class roleUsersDataRequest {
  constructor(public roleUsers?: UserData[],
    public roleKey?: number) {

  }
}

