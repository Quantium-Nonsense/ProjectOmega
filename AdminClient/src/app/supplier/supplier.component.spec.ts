import { HttpClient } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatDialogHarness } from '@angular/material/dialog/testing';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSnackBarHarness } from '@angular/material/snack-bar/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { cold, hot } from 'jasmine-marbles';
import { Observable } from 'rxjs';
import * as fromApp from '../reducers/index';
import { ApiPathService } from '../services/api-path.service';
import { emptyState } from '../shared/empty.state';
import { SupplierModel } from '../shared/model/supplier/supplier.model';
import * as ToolbarActions from '../toolbar/store/toolbar.actions';
import { selectIsProgressBarVisible } from '../toolbar/store/toolbar.reducer';
import * as SuppliersActions from './store/suppliers.actions';
import { SuppliersEffects } from './store/suppliers.effects';
import { selectAllSuppliers } from './store/suppliers.reducer';
import { SupplierFormComponent } from './supplier-form/supplier-form.component';

import { SupplierComponent } from './supplier.component';

const mockSuppliers = () => {
  const mockList: SupplierModel[] = [];
  for (let i = 0; i < 50; i++) {
    mockList.push({
      id: i.toString(),
      email: `email${ i }@email.com`,
      companyName: `companyName${ i }`,
      firstName: `firstName${ i }`,
      lastName: `lastName${ i }`,
      description: `description${ i }`,
      notes: null,
      contactNumber: '121341321341'
    });
  }
  return mockList;
};
describe('SupplierComponent', () => {
  let component: SupplierFormComponent;
  let fixture: ComponentFixture<SupplierFormComponent>;
  let actions$: Observable<Action>;
  let effects: SuppliersEffects;

  let mockStore$: MockStore;
  let mockSelectIsProgressBarVisible;
  let mockSelectAllSuppliers;
  beforeEach(() => {
    TestBed.configureTestingModule({
             declarations: [SupplierFormComponent],
             imports: [
               NoopAnimationsModule,
               MatDialogModule,
               MatSnackBarModule
             ],
             providers: [
               provideMockStore<fromApp.State>({
                 initialState: emptyState
               }),
               provideMockActions(() => actions$),
               SuppliersEffects,
               MatDialogHarness,
               MatSnackBarHarness,
               {
                 provide: MatDialogRef,
                 useValue: {}
               },
               {
                 provide: MAT_DIALOG_DATA,
                 useValue: {}
               },
               {
                 provide: HttpClient,
                 useValue: null
               },
               {
                 provide: ApiPathService,
                 useValue: null
               }
             ]
           })
           .compileComponents();

    mockStore$ = TestBed.inject(MockStore);
    mockSelectIsProgressBarVisible = mockStore$.overrideSelector(selectIsProgressBarVisible, false);
    mockSelectAllSuppliers = mockStore$.overrideSelector(selectAllSuppliers, []);

    effects = TestBed.inject(SuppliersEffects);

  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load all suppliers', () => {
    const suppliers = mockSuppliers();
    const httpSpy = spyOn(effects, 'httpGetAllSuppliers').and.callThrough().and.returnValue(
        cold('--a|', {
              a: suppliers
            }
        ));

    actions$ = hot('-a', { a: SuppliersActions.beginLoadingSuppliers() });

    const expected = hot('---(ab)', {
      a: SuppliersActions.allSuppliersLoaded({ suppliers }),
      b: ToolbarActions.stopProgressBar()
    });

    expect(effects.loadAllSuppliers$).toBeObservable(expected);
  });

  it('should stop progress bar and show error on error http response', () => {
    const suppliers = mockSuppliers();
    const httpSpy = spyOn(effects, 'httpGetAllSuppliers').and.returnValue(
        cold('--#|', null, 'Bad!')
    );

    actions$ = hot('-a', {
      a: SuppliersActions.beginLoadingSuppliers()
    });

    const expected = hot('---(ab)', {
      a: ToolbarActions.stopProgressBar(),
      b: SuppliersActions.showErrorMessage({ error: 'Bad!' })
    });

    expect(effects.loadAllSuppliers$).toBeObservable(expected);
  });

  it('should indicate a message when a supplier has been edited with success', () => {
    actions$ = hot('---a', { a: SuppliersActions.newSupplierCreateSuccess() });

    const expected = hot('---a', { a: SuppliersActions.beginLoadingSuppliers() });

    expect(effects.showSupplierCreatedSuccessMessageAndClear$).toBeObservable(expected);
  });

  it('should indicate a message when a supplier has failed to create with error', () => {
    actions$ = hot('---a', { a: SuppliersActions.newSupplierCreateFailed({ error: 'Bad :(!' }) });

    const expected = hot('---a', { a: SuppliersActions.showErrorMessage({ error: 'Bad :(!' }) });

    expect(effects.showSupplerFailedToCreateMessage$).toBeObservable(expected);
  });

  it('should fire failed action on supplier creation error', () => {
    const supplier: SupplierModel = mockSuppliers()[0];

    const spy = spyOn(effects, 'httpCreateNewSupplier').and.returnValue(cold(
        '---#|',
        null,
        new Error('error goes brrr')
    ));

    actions$ = hot('--a', { a: SuppliersActions.attemptToCreateNewSupplier({ supplier }) });

    const expected = hot('-----(ab)', {
      a: ToolbarActions.stopProgressBar(),
      b: SuppliersActions.newSupplierCreateFailed({ error: 'error goes brrr' })
    });

    expect(effects.createSupplier$).toBeObservable(expected);
  });

  it('should create a new supplier', () => {
    const supplier: SupplierModel = mockSuppliers()[0];

    const spy = spyOn(effects, 'httpCreateNewSupplier').and.returnValue(cold(
        '---a',
        supplier
    ));

    actions$ = hot('--a', { a: SuppliersActions.attemptToCreateNewSupplier({ supplier }) });

    const expected = hot('-----(ab)', {
      a: SuppliersActions.newSupplierCreateSuccess(),
      b: ToolbarActions.stopProgressBar()
    });

    expect(effects.createSupplier$).toBeObservable(expected);
  });

  it('should reload page when a supplier has been deleted', () => {
    actions$ = hot('---a', { a: SuppliersActions.deleteSupplierSuccess() });

    const expected = hot('---(ab)', {
      a: ToolbarActions.beginProgressBar(),
      b: SuppliersActions.beginLoadingSuppliers()
    });

    expect(effects.deleteSupplierSucess$).toBeObservable(expected);
  });

  it('should show error on failiure to delete supplier', () => {
    const supplier = mockSuppliers()[0];
    const spy = spyOn(effects, 'httpDeleteSupplier').and.returnValue(
        cold('---#|', null, 'error go brrr')
    );

    actions$ = hot('---a', { a: SuppliersActions.deleteSupplier({ supplier }) });

    const expected = hot('------(ab)', {
      a: ToolbarActions.stopProgressBar(),
      b: SuppliersActions.showErrorMessage({ error: 'error go brrr' })
    });

    expect(effects.deleteSupplier$).toBeObservable(expected);
  });

  it('should fire action deletesuppliersuccess when supplier has been deleted successfully', () => {
    const supplier = mockSuppliers()[0];
    const spy = spyOn(effects, 'httpDeleteSupplier').and.returnValue(
        cold('---a|', {
          a: supplier
        })
    );

    actions$ = hot('---a', { a: SuppliersActions.deleteSupplier({ supplier }) });

    const expected = hot('------(ab)', {
      a: ToolbarActions.stopProgressBar(),
      b: SuppliersActions.deleteSupplierSuccess()
    });

    expect(effects.deleteSupplier$).toBeObservable(expected);
  });

  it('should fire action edit when supplier has been edited successfully', () => {
    const supplier = mockSuppliers()[0];
    const spy = spyOn(effects, 'httpEditSupplier').and.returnValue(
        cold('---a|', {
          a: supplier
        })
    );

    actions$ = hot('---a', { a: SuppliersActions.editSupplier({ editedSupplier: supplier }) });

    const expected = hot('------(abc)', {
      a: ToolbarActions.stopProgressBar(),
      b: SuppliersActions.editSupplierSuccess(),
      c: SuppliersActions.beginLoadingSuppliers()
    });

    expect(effects.editSupplier$).toBeObservable(expected);
  });
});
