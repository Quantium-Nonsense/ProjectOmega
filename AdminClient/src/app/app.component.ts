import { DOCUMENT } from '@angular/common';
import { Component } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { initLogger } from './reducerLogger';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  sideNavOpen = false;
  title = 'OmegaSys';

  constructor(
    @Inject(DOCUMENT) private document,
    private logger: NGXLogger
  ) {
    logger.info('Initializing logger for ngrx');
    initLogger(logger);
  }

  ngOnInit(): void {
    if (environment.common.gitCompany === 'client1') {
      this.logger.debug('i am client 1');
      this.document.getElementById('theme').setAttribute('href', 'assets/css/indigo-pink.css');
    } else if (environment.common.gitCompany === 'client2') {
      this.logger.debug('i am client 2');
      this.document.getElementById('theme').setAttribute('href', 'assets/css/purple-green.css');
    } else {
      this.logger.debug('i am default client');
      this.document.getElementById('theme').setAttribute('href', 'assets/css/deeppurple-amber.css');
    }
  }
}
