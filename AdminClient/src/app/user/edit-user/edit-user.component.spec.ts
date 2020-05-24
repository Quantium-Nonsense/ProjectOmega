import { HarnessLoader } from '@angular/cdk/testing';
import { CommonModule } from '@angular/common';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatDialogHarness } from '@angular/material/dialog/testing';
import { BrowserModule } from '@angular/platform-browser';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import * as fromApp from '../../reducers/index';
import { emptyState } from '../../shared/empty.state';
import { selectIsProgressBarVisible } from '../../toolbar/store/toolbar.reducer';
import { selectRoles } from '../../user/store/user.reducer';
import { EditUserComponent } from './edit-user.component';

describe('EditUserComponent', () => {
  let component: EditUserComponent;
  let fixture: ComponentFixture<EditUserComponent>;

  let loader: HarnessLoader;
  let documentLoader: HarnessLoader;

  let mockSelectRoles;
  let mockSelectIsProgressBarVisible;
  let mockStore: MockStore;

  beforeEach(() => {
    TestBed.configureTestingModule({
             declarations: [
               EditUserComponent
             ],
             providers: [
               {
                 provide: MAT_DIALOG_DATA,
                 useValue: {
                   data: {}
                 }
               },
               FormBuilder,
               provideMockStore<fromApp.State>({
                 initialState: emptyState
               })
             ],
             imports: [
               BrowserModule,
               CommonModule
             ]
           })
           .compileComponents();
  });

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

    mockStore = TestBed.inject(MockStore);

    mockSelectRoles = mockStore.overrideSelector(selectRoles, []);
    mockSelectIsProgressBarVisible = mockStore.overrideSelector(selectIsProgressBarVisible, false);

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
