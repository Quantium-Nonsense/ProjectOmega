// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

import {commonEnvironment} from './enviroment.common';

export const environment = {
  production: false,
  ACCESS_TOKEN: '',
  common: commonEnvironment,
  logging: {
    kafkaBrokerURI: '104.196.186.213',
    kafkaBrokerPort: 9092,
    kafkaTopic: 'staging-logs',
    showConsole: true,
    level: 'INFO'
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
