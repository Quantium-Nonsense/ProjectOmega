import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {CustomerFormComponent} from './customer-form.component';
import {provideMockStore} from '@ngrx/store/testing';
import {MatDialogHarness} from '@angular/material/dialog/testing';
import {MatDialogRef} from '@angular/material/dialog';
import loader from '@angular-devkit/build-angular/src/angular-cli-files/plugins/single-test-transform';
import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';

describe('CustomerFormComponent', () => {
	let component: CustomerFormComponent;
	let fixture: ComponentFixture<CustomerFormComponent>;

	let loader: HarnessLoader;
	let documentLoader: HarnessLoader;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
				   declarations: [CustomerFormComponent],
				   providers: [
					   provideMockStore({
						   initialState: {
							   customers: {}
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
		fixture = TestBed.createComponent(CustomerFormComponent);
		component = fixture.componentInstance;

		loader = TestbedHarnessEnvironment.loader(fixture);
		documentLoader = TestbedHarnessEnvironment.documentRootLoader(fixture);

		fixture.detectChanges();
	});

	afterAll(async () => {
		try {
			const matDialog = await documentLoader.getHarness(MatDialogHarness)
			await matDialog.close();
		}
		catch (e) {
			// Ignore as this just means not found
		}
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
