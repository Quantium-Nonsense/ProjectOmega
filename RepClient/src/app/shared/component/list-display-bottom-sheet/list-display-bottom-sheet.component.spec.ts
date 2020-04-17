import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../../shared.module';

import { ListDisplayBottomSheetComponent } from './list-display-bottom-sheet.component';

describe('ListDisplayBottomSheetComponent', () => {
  let component: ListDisplayBottomSheetComponent;
  let fixture: ComponentFixture<ListDisplayBottomSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ListDisplayBottomSheetComponent
      ],
      imports: [
        SharedModule,
        IonicModule.forRoot()
      ],
      providers: [
        {provide: MAT_BOTTOM_SHEET_DATA, useValue: {}}
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(ListDisplayBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
