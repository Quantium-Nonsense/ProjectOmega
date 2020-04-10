import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { ListDisplayBottomSheetComponent } from './list-display-bottom-sheet.component';

describe('ListDisplayBottomSheetComponent', () => {
  let component: ListDisplayBottomSheetComponent;
  let fixture: ComponentFixture<ListDisplayBottomSheetComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListDisplayBottomSheetComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(ListDisplayBottomSheetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
