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
    if (window['env']['company'] === 'client1') {
      this.document.getElementById('theme').setAttribute('href', 'node_modules/@angular/material/prebuilt-themes/indigo-pink.css');
    } else {
      this.document.getElementById('theme').setAttribute('href', 'node_modules/@angular/material/prebuilt-themes/deeppurple-amber.css');
    }
  }
}
