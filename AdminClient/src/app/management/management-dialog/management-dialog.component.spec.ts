import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManagementDialogComponent } from './management-dialog.component';

describe('ManagementDialogComponent', () => {
  let component: ManagementDialogComponent;
  let fixture: ComponentFixture<ManagementDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManagementDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManagementDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
