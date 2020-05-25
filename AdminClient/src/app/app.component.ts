import { DOCUMENT } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';

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
    console.log('trigger me senpai!');
    if (window['env']['company'] === 'client1') {
      this.document.getElementById('theme').setAttribute('href', 'assets/css/indigo-pink.css');
    } else if (window['env']['company'] === 'client2') {
      this.document.getElementById('theme').setAttribute('href', 'assets/css/purple-green.css');
    } else {
      this.document.getElementById('theme').setAttribute('href', 'nassets/css/deeppurple-amber.css');
    }
  }
}
