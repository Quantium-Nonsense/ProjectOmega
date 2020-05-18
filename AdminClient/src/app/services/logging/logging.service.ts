import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';

import * as Logger from 'winston';

@Injectable({
  providedIn: 'root'
})
export class LoggingService {

  private logger;

  constructor() {
    this.logger = Logger.createLogger({
      level: environment.logging.level,
      format: Logger.format.json()
    })
  }

}
