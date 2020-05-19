import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDialogHarness } from '@angular/material/dialog/testing';
import { MatProgressBarHarness } from '@angular/material/progress-bar/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Action, MemoizedSelector } from '@ngrx/store';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { Observable } from 'rxjs';
import { routes } from '../app-routing.module';
import * as fromApp from '../reducers';
import { TestModule } from '../shared/test/test.module';
import * as fromToolbar from '../toolbar/store/toolbar.reducer';
import { ToolbarEffects } from './store/toolbar.effects';
import { ToolbarComponent } from './toolbar.component';

describe('ToolbarComponent', () => {
  let component: ToolbarComponent;
  let fixture: ComponentFixture<ToolbarComponent>;

  let loader: HarnessLoader;
  let documentLoader: HarnessLoader;

  let mockStore: MockStore<fromApp.State>;
  let mockProgressBarSelector: MemoizedSelector<fromToolbar.State, boolean>;
  let effects: ToolbarEffects;
  let actions$: Observable<Action>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ToolbarComponent],
      providers: [
        MatDialogHarness,
        provideMockStore({
          initialState: {
            toolbar: {
              progressBar: false,
            }
          } as fromApp.State
        }),
        provideMockActions(() => actions$),
        ToolbarEffects,
      ],
      imports: [
        TestModule,
        RouterTestingModule.withRoutes(routes),
      ]
    })
      .compileComponents();
    fixture = TestBed.createComponent(ToolbarComponent);
    component = fixture.componentInstance;

    loader = TestbedHarnessEnvironment.loader(fixture);
    documentLoader = TestbedHarnessEnvironment.documentRootLoader(fixture);

    mockStore = TestBed.inject(MockStore);
    effects = TestBed.inject<ToolbarEffects>(ToolbarEffects);

    mockProgressBarSelector = mockStore.overrideSelector(
      fromToolbar.selectIsVisible,
      false
    );

    mockStore.refreshState();
    fixture.detectChanges();
  }));

  afterEach(async () => {
    try {
      const matDialog = await documentLoader.getHarness(MatDialogHarness);
      if (matDialog) {
        await matDialog.close();
      }
    } catch (e) {
      // ignore means no dialog is up
    }
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should present progress bar when loading anything', async () => {
    component.ngOnInit();
    mockProgressBarSelector.setResult(true);
    mockStore.refreshState();
    fixture.detectChanges();
    const progressBar: MatProgressBarHarness = await loader.getHarness(MatProgressBarHarness);
    expect(progressBar).toBeTruthy();
  });
});
