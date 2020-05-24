import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { provideMockStore } from '@ngrx/store/testing';
import { emptyState } from '../../shared/empty.state';
import { OrderDetailsDialogComponent } from './order-details-dialog.component';

describe('DetailsDialogComponent', () => {
  let component: OrderDetailsDialogComponent;
  let fixture: ComponentFixture<OrderDetailsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
             declarations: [OrderDetailsDialogComponent],
             imports: [
               MatDialogModule
             ],
             providers: [
               provideMockStore({
                 initialState: emptyState
               }),
               { provide: MatDialogRef, useValue: {} },
               { provide: MAT_DIALOG_DATA, useValue: {} }
             ]
           })
           .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
