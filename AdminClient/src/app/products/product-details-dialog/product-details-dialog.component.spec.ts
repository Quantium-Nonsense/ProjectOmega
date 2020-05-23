import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import * as fromApp from '../../reducers/index';
import { emptyState } from '../../shared/empty.state';
import { selectAllSuppliers } from '../../supplier/store/suppliers.reducer';
import { selectIsProgressBarVisible } from '../../toolbar/store/toolbar.reducer';
import { ProductDetailsDialogComponent } from './product-details-dialog.component';

describe('DetailsDialogComponent', () => {
  let component: ProductDetailsDialogComponent;
  let fixture: ComponentFixture<ProductDetailsDialogComponent>;

  let mockSelectIsProgressBarVisible;
  let mockSelectAllSuppliers;
  let mockStore$: MockStore;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
             declarations: [ProductDetailsDialogComponent],
             imports: [
               MatDialogModule
             ],
             providers: [
               FormBuilder,
               provideMockStore<fromApp.State>({
                 initialState: emptyState
               }),
               { provide: MatDialogRef, useValue: {} },
               { provide: MAT_DIALOG_DATA, useValue: {} }
             ]
           })
           .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();

    mockStore$ = TestBed.inject(MockStore);
    mockSelectIsProgressBarVisible = mockStore$.overrideSelector(selectIsProgressBarVisible, false);
    mockSelectAllSuppliers = mockStore$.overrideSelector(selectAllSuppliers, []);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
