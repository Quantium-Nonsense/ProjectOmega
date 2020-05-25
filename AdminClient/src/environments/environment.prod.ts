import { NgxLoggerLevel } from 'ngx-logger';
import { commonEnvironment } from './enviroment.common';

export const environment = {
  production: true,
  common: commonEnvironment,
  logLevel: NgxLoggerLevel.INFO,
  serverLogLevel: NgxLoggerLevel.INFO
};


