import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { provideMockStore } from '@ngrx/store/testing';

import { EditUserComponent } from './edit-user.component';
import { MatDialogHarness } from '@angular/material/dialog/testing';
import { HarnessLoader } from '@angular/cdk/testing';

describe('EditUserComponent', () => {
  let component: EditUserComponent;
  let fixture: ComponentFixture<EditUserComponent>;

  let loader: HarnessLoader;
  let documentLoader: HarnessLoader;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
             declarations: [
               EditUserComponent
             ],
             providers: [
               provideMockStore()
             ]
           })
           .compileComponents();
  }));

  afterAll(async () => {
    try {
      const matDialog = await documentLoader.getHarness(MatDialogHarness);
      await matDialog.close();
    } catch (e) {
      // Ignore as this just means not found
    }
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
