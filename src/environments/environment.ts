import Helper from '../utilities/helper';

// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  apiUrl: 'https://localhost:5001',
  //apiUrl: 'http://localhost:8080',

  sitesUrl: Helper.baseUrl + "api/v1/sites/",
  rolesUrl : Helper.baseUrl + "api/v1/roles/"
};

