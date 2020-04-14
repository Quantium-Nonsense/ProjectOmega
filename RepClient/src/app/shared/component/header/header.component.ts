import { Component, Input, OnInit } from '@angular/core';
import { AlertController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import * as fromApp from './../../../reducers/index';
import * as OrderActions from './../../../order/store/order.actions';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  @Input() title: string;
  @Input() displayItemsInBasketIndicator: boolean;

  constructor(
    private store: Store<fromApp.State>,
    public confirmDialog: AlertController
  ) {
  }

  ngOnInit(): void {
  }

  async resetOrder(): Promise<void> {
    const dialog = await this.confirmDialog.create({
      header: 'Reset order',
      message: 'This will clear the order cart are you sure?',
      buttons: [
        {
          text: 'Cancel',
          handler: async () => {
            await this.confirmDialog.dismiss();
          }
        },
        {
          text: 'Confirm',
          handler: () => {
            this.store.dispatch(OrderActions.resetOrder());
          }
        }
      ]
    });
    await dialog.present(); // Show
  }

  confirmOrder(): void {
    this.store.dispatch(OrderActions.navigateToConfirmOrder());
  }
}
