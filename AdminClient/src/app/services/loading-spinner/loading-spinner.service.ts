import { Overlay, OverlayRef } from '@angular/cdk/overlay';
import { ComponentPortal } from '@angular/cdk/portal';
import { Injectable } from '@angular/core';
import { MatSpinner } from '@angular/material/progress-spinner';
import { Observable, Subject } from 'rxjs';
import { switchAll } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class LoadingSpinnerService {
  private spin$: Subject<Observable<boolean>> = new Subject<Observable<boolean>>();

  private spinnerTopRef: OverlayRef = this.cdkSpinnerCreate();

  constructor(
    private overlay: Overlay,
  ) {
    this.spin$.pipe(switchAll())
      .subscribe(shouldDisplay => {
        if (shouldDisplay) {
          this.showSpinner();
        } else {
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

  public observeNext = (newObservable: Observable<boolean>) => {
    this.spin$.next(newObservable);
  };

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
