import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { MenuController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { AppState } from '../reducers';
import { AuthState } from './store/auth.reducer';


@Component({
  selector: 'app-auth',
  styleUrls: ['./auth.page.scss'],
  templateUrl: './auth.page.html'
})
export class AuthPage implements OnInit {

  /**
   * Holds all the subscriptions that will need to be cleaned up when a view swaps
   */
  private subscriptions = new Subscription();

  constructor(
    public menuController: MenuController,
    private store: Store<AppState>,
    private snackBar: MatSnackBar
  ) {
  }

  async ionViewWillEnter(): Promise<void> {
    await this.menuController.enable(false);
    this.subscriptions.add(this.store.select('auth').subscribe((state: AuthState) => {
      if (state.errorMessage) {
        this.showMessage(state.errorMessage);
      }
    }));
  }

  ionViewWillLeave(): void {
    // Clean up all subs to avoid memory leak
    this.subscriptions.unsubscribe();
  }

  ngOnInit(): void {
  }

  /**
   * Displays a message message on the Auth Page as a little toast at the bottom
   * @param message The message to display
   * @param duration The duration for the message
   */
  private showMessage = (message: string, duration = 2000): void => {
    this.snackBar.open(message, undefined, {
      duration: 2000
    });
  };
}
