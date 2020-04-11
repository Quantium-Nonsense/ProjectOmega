import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatSpinner } from '@angular/material/progress-spinner';
import { Subject } from 'rxjs';
import { map, scan } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoadingSpinnerService {
  public spin$: Subject<boolean> = new Subject();

  private spinnerTopRef: OverlayRef = this.cdkSpinnerCreate();

  constructor(
    private overlay: Overlay,
  ) {
    this.spin$
      .asObservable()
      .pipe(
        map(val => val ? 1 : -1),
        scan((acc, one) => (acc + one) >= 0 ? acc + one : 0, 0)
      )
      .subscribe(
        (res) => {
          if (res === 1) {
            this.showSpinner();
          } else if (res === 0) {
            if (this.spinnerTopRef.hasAttached()) {
              this.stopSpinner();
            }
          }
        });
  }

  public showSpinner() {
    this.spinnerTopRef.attach(new ComponentPortal(MatSpinner));
  }

  public stopSpinner() {
    this.spinnerTopRef.detach();
  }

  private cdkSpinnerCreate() {
    return this.overlay.create({
      hasBackdrop: true,
      backdropClass: 'dark-backdrop',
      positionStrategy: this.overlay.position()
        .global()
        .centerHorizontally()
        .centerVertically()
    });
  }

}
