import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { forkJoin, Observable } from 'rxjs';
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { ProductModel } from '../../models/products/products.model';
import { ApiPathService } from '../../services/api-path.service';
import { SupplierModel } from '../../shared/model/supplier/supplier.model';
import { allSuppliersLoaded } from '../../supplier/store/suppliers.actions';
import { stopProgressBar } from '../../toolbar/store/toolbar.actions';
import { ProductDetailsDialogComponent } from '../product-details-dialog/product-details-dialog.component';
import {
  allProductsLoaded,
  createNewProduct,
  deleteProduct,
  editNewProduct,
  hasErrorMessage,
  getAllProducts,
  showProductForm
} from './products.actions';

@Injectable()
export class ProductsEffects {

  deleteProduct$ = createEffect(() => this.actions$.pipe(
      ofType(deleteProduct),
      switchMap((action: Action & { product: ProductModel }) => {
        return this.httpDeleteProduct(action.product).pipe(
            switchMap(() => {
              return [
                getAllProducts()
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

  createNewProduct$ = createEffect(() => this.actions$.pipe(
      ofType(createNewProduct),
      switchMap((action: Action & { product: ProductModel }) => {
        return this.httpCreateNewProduct(action.product).pipe(
            switchMap((product) => {
              this.snackBar.open('New product created!', null, {
                duration: 3000
              });
              this.dialog.closeAll();
              return [
                getAllProducts(),
                stopProgressBar()
              ];
            }),
            catchError((error: Error) => {
              this.dialog.closeAll();
              return [
                hasErrorMessage({ error: error.message }),
                stopProgressBar()
              ];
            })
        );
      })
  ));

  editProduct$ = createEffect(() => this.actions$.pipe(
      ofType(editNewProduct),
      switchMap((action: Action & { product: ProductModel }) => {
        return this.httpEditProduct(action.product).pipe(
            tap(() => this.dialog.closeAll()),
            switchMap((product: ProductModel) => {
              this.snackBar.open('Product was successfully eddied', null, {
                duration: 3000
              });
              return [
                getAllProducts()
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

  showProductForm$ = createEffect(() => this.actions$.pipe(
      ofType(showProductForm),
      map((action: Action & { product: ProductModel }) => {
        this.dialog.open(ProductDetailsDialogComponent, {
          data: {
            product: action.product
          },
          width: '66vw',
          height: '50vh'
        });
      })
  ), { dispatch: false });

  onLoadAllProducts$ = createEffect(() => this.actions$.pipe(
      ofType(getAllProducts),
      switchMap((action: Action) => {
        return this.httpLoadAllProductsAndSuppliers().pipe(
            switchMap(([products, suppliers]) => {
              return [
                allProductsLoaded({ products }),
                allSuppliersLoaded({ suppliers }),
                stopProgressBar()
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
      private snackBar: MatSnackBar,
      private dialog: MatDialog
  ) {
  }

  httpDeleteProduct(product: ProductModel) {
    return this.http.delete(this.endPoints.getDeleteProductEndPoint(product.id));
  }

  httpEditProduct(product: ProductModel): Observable<ProductModel> {
    return this.http.put<ProductModel>(this.endPoints.getEditProductEndPoint(product.id), {
      ...product
    });
  }

  httpCreateNewProduct(product: ProductModel): Observable<ProductModel> {
    return this.http.post<ProductModel>(this.endPoints.createNewProductEndPoint, {
      ...product
    });
  }

  httpLoadAllProductsAndSuppliers(): Observable<[ProductModel[], SupplierModel[]]> {
    return forkJoin([
      this.http.get<ProductModel[]>(this.endPoints.allProductsEndPoint),
      this.http.get<SupplierModel[]>(this.endPoints.allSuppliers)
    ]);
  }
}
