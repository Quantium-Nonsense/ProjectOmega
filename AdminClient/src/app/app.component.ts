import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  sideNavOpen = false;
  title = 'OmegaSys';

  constructor(@Inject(DOCUMENT) private document) {
  }

  ngOnInit(): void {
    console.log(window['env']['company']);
    environment.common.setApiRoot(window['env']['apiRoot']);
    if (window['env']['company'] === 'client1') {
      this.document.getElementById('theme').setAttribute('href', 'assets/css/aaand clientindigo-pink.css');
    } else if (window['env']['company'] === 'client2') {
      this.document.getElementById('theme').setAttribute('href', 'assets/css/purple-green.css');
    } else {
      this.document.getElementById('theme').setAttribute('href', 'nassets/css/deeppurple-amber.css');
    }
  }
}
