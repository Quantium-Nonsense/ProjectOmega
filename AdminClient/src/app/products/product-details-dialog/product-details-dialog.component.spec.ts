import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductDetailsDialogComponent } from './product-details-dialog.component';

describe('DetailsDialogComponent', () => {
  let component: ProductDetailsDialogComponent;
  let fixture: ComponentFixture<ProductDetailsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ProductDetailsDialogComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductDetailsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
