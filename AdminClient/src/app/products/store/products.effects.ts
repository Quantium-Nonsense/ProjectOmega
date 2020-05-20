import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs';
import { catchError, map, switchMap } from 'rxjs/operators';
import { ProductModel } from '../../models/products/products.model';
import { ApiPathService } from '../../services/api-path.service';
import { beginProgressBar, stopProgressBar } from '../../toolbar/store/toolbar.actions';
import { allProductsLoaded, hasErrorMessage, loadAllProducts } from './products.actions';

@Injectable()
export class ProductsEffects {

  onLoadAllProducts$ = createEffect(() => this.actions$.pipe(
      ofType(loadAllProducts),
      switchMap((action: Action) => {
        return this.httpLoadAllProducts().pipe(
            switchMap((products: ProductModel[]) => {
              return [
                allProductsLoaded({ products }),
                beginProgressBar()
              ];
            }),
            catchError((error: Error) => {
              return [
                stopProgressBar(),
                hasErrorMessage({ error: error.message })
              ];
            })
        );
      })
  ));

  showErrorMessage$ = createEffect(() => this.actions$.pipe(
      ofType(hasErrorMessage),
      map((action: Action & { error: string }) => {
        this.snackBar.open(action.error, null, {
          duration: 3000
        });
      })
  ), { dispatch: false });

  constructor(
      private actions$: Actions,
      private http: HttpClient,
      private endPoints: ApiPathService,
      private snackBar: MatSnackBar
  ) {
  }

  httpLoadAllProducts(): Observable<ProductModel[]> {
    return this.http.get<ProductModel[]>(this.endPoints.allProductsEndPoint);
  }
}
