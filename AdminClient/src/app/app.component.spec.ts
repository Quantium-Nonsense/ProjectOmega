import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {AppComponent} from './app.component';
import {HarnessLoader} from '@angular/cdk/testing';
import {TestbedHarnessEnvironment} from '@angular/cdk/testing/testbed';

describe('AppComponent', () => {
	let loader: HarnessLoader;
	let fixture: ComponentFixture<AppComponent>;
    let component: AppComponent

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				AppComponent
			]
		}).compileComponents();

		fixture = TestBed.createComponent(AppComponent);
		loader = TestbedHarnessEnvironment.loader(fixture);
		component = fixture.componentInstance;

	}));

	it('should create the app', () => {
		const app = fixture.debugElement.componentInstance;
		expect(app).toBeTruthy();
	});

});
