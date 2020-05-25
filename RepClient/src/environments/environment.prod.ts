import { NgxLoggerLevel } from 'ngx-logger';
import { commonEnvironment } from './environment.common';

export const environment = {
  common: commonEnvironment,
  ACCESS_TOKEN: 'ACCESS_TOKEN',
  production: true,
  logLevel: NgxLoggerLevel.INFO,
  serverLogLevel: NgxLoggerLevel.INFO

};
