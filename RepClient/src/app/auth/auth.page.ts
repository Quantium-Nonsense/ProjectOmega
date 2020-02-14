import { Component, OnInit } from '@angular/core';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-auth',
  styleUrls: ['./auth.page.scss'],
  templateUrl: './auth.page.html',
})
export class AuthPage implements OnInit {

  constructor(
    public menuController: MenuController
  ) {
  }

  async ionViewWillEnter(): Promise<void> {
    await this.menuController.enable(false);
  }

  ngOnInit(): void {
  }

}
