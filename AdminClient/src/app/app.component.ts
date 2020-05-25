import { Component } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { initLogger } from './reducerLogger';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  sideNavOpen = false;
  title = 'OmegaSys';

  constructor(private logger: NGXLogger) {
    logger.info('Initializing logger for ngrx');
    initLogger(logger);
  }
}
