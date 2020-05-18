import { commonEnvironment } from './enviroment.common';

export const environment = {
  production: true,
  common: commonEnvironment,
  logging: {
    kafkaBrokerURI: '104.196.186.213',
    kafkaBrokerPort: 9092,
    kafkaTopic: 'production-logs',
    showConsole: false,
    level: 'INFO'
  }
};


