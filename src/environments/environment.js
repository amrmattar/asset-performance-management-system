"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helper_1 = require("../utilities/helper");
// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
exports.environment = {
    production: false,
    apiUrl: 'https://api.coloredstrategies.com',

    sitesUrl: helper_1.default.baseUrl + "api/v1/sites/",
    rolesUrl: helper_1.default.baseUrl + "api/v1/roles/"
};
