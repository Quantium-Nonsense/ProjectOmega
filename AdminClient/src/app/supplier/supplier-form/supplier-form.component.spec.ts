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
import { ApiPathService } from '../../services/api-path.service';
import { SupplierModel } from '../../shared/model/supplier/supplier.model';
import * as ToolbarActions from '../../toolbar/store/toolbar.actions';
import * as fromToolbar from '../../toolbar/store/toolbar.reducer';
import * as SuppliersActions from '../store/suppliers.actions';
import { SuppliersEffects } from '../store/suppliers.effects';
import { SupplierFormComponent } from './supplier-form.component';

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

describe('SupplierFormComponent', () => {
  let component: SupplierFormComponent;
  let fixture: ComponentFixture<SupplierFormComponent>;
  let actions$: Observable<Action>;
  let effects: SuppliersEffects;
  let mockStore$: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
             declarations: [SupplierFormComponent],
             imports: [
               NoopAnimationsModule,
               MatDialogModule,
               MatSnackBarModule
             ],
             providers: [
               provideMockStore({
                 initialState: {
                   suppliers: {},
                   toolbar: {
                     progressBar: false
                   } as fromToolbar.State
                 }
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

});
