import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { NGXLogger } from 'ngx-logger';
import { environment } from '../environments/environment';
import { getSessionID } from './session-id';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  sideNavOpen = false;
  title = 'OmegaSys';

  constructor(
    @Inject(DOCUMENT) private document,
    private logger: NGXLogger
  ) {
  }

  ngOnInit(): void {
    if (environment.common.gitCompany === 'client1') {
      this.logger.info('i am client 1');
      this.document.getElementById('theme').setAttribute('href', 'assets/css/indigo-pink.css');
    } else if (environment.common.gitCompany === 'client2') {
      this.logger.info('i am client 2');
      this.document.getElementById('theme').setAttribute('href', 'assets/css/purple-green.css');
    } else {
      this.logger.info('i am default client');
      this.document.getElementById('theme').setAttribute('href', 'assets/css/deeppurple-amber.css');
    }
  }
}
