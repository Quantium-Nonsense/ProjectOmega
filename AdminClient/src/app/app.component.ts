import { DOCUMENT } from '@angular/common';
import { Component, Inject } from '@angular/core';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  sideNavOpen = false;
  title = 'OmegaSys';

  constructor(@Inject(DOCUMENT) private document) {
  }

  ngOnInit(): void {
    environment.common.setApiRoot(window['env']['apiRoot']);
    if (environment.common.gitCompany === 'client1') {
      console.log('i am client 1');
      this.document.getElementById('theme').setAttribute('href', 'assets/css/indigo-pink.css');
    } else if (environment.common.gitCompany === 'client2') {
      console.log('i am client 2');
      this.document.getElementById('theme').setAttribute('href', 'assets/css/purple-green.css');
    } else {
      console.log('i am default client');
      this.document.getElementById('theme').setAttribute('href', 'assets/css/deeppurple-amber.css');
    }
  }
}
