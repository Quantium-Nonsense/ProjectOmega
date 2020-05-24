import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatDialogHarness } from '@angular/material/dialog/testing';
import { provideMockStore } from '@ngrx/store/testing';
import * as fromApp from '../../reducers/index';
import { emptyState } from '../../shared/empty.state';
import { CustomerFormComponent } from './customer-form.component';

describe('CustomerFormComponent', () => {
	let component: CustomerFormComponent;
	let fixture: ComponentFixture<CustomerFormComponent>;

	let loader: HarnessLoader;
	let documentLoader: HarnessLoader;

	beforeEach(() => {
		TestBed.configureTestingModule({
				   declarations: [CustomerFormComponent],
				   providers: [
					   provideMockStore<fromApp.State>({
						   initialState: emptyState
					   }),
					   { provide: MAT_DIALOG_DATA, useValue: {} },
					   MatDialogHarness,
					   {
						   provide: MatDialogRef,
						   useValue: jasmine.createSpyObj(MatDialogRef, ['open', 'close'])
					   }
				   ]
			   })
			   .compileComponents();
	});

	beforeEach(() => {
		fixture = TestBed.createComponent(CustomerFormComponent);
		component = fixture.componentInstance;

		loader = TestbedHarnessEnvironment.loader(fixture);
		documentLoader = TestbedHarnessEnvironment.documentRootLoader(fixture);

		fixture.detectChanges();
	});

	afterAll(async () => {
		try {
			const matDialog = await documentLoader.getHarness(MatDialogHarness);
			await matDialog.close();
		} catch (e) {
			// Ignore as this just means not found
		}
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
