import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogRef } from '@angular/material/dialog';
import { MatDialogHarness } from '@angular/material/dialog/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { SupplierFormComponent } from './supplier-form.component';

describe('SupplierFormComponent', () => {
  let component: SupplierFormComponent;
  let fixture: ComponentFixture<SupplierFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
             declarations: [SupplierFormComponent],
             providers: [
               provideMockStore({
                 initialState: {
                   suppliers: {}
                 }
               }),
               MatDialogHarness,
               {
                 provide: MatDialogRef,
                 useValue: jasmine.createSpyObj(MatDialogRef, ['open', 'close'])
               }
             ]
           })
           .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SupplierFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
