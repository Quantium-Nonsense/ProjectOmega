import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {SupplierComponent} from './supplier.component';
import {provideMockStore} from '@ngrx/store/testing';

describe('ClientsComponent', () => {
	let component: SupplierComponent;
	let fixture: ComponentFixture<SupplierComponent>;

	beforeEach(async(() => {
		TestBed.configureTestingModule({
				   declarations: [SupplierComponent],
				   providers: [
					   provideMockStore({
						   initialState: {
							   suppliers: {}
						   }
					   })
				   ]
			   })
			   .compileComponents();
	}));

	beforeEach(() => {
		fixture = TestBed.createComponent(SupplierComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create', () => {
		expect(component).toBeTruthy();
	});
});
