import { HarnessLoader } from '@angular/cdk/testing';
import { TestbedHarnessEnvironment } from '@angular/cdk/testing/testbed';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { LoggerTestingModule } from 'ngx-logger/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {
	let loader: HarnessLoader;
	let fixture: ComponentFixture<AppComponent>;
    let component: AppComponent

	beforeEach(async(() => {
		TestBed.configureTestingModule({
			declarations: [
				AppComponent
			],
      imports: [
        LoggerTestingModule,
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
