import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NavigationEnd, Router} from '@angular/router';

@Component({
	selector: 'app-toolbar',
	templateUrl: './toolbar.component.html',
	styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
	@Input() title: string;

	@Input()
	get sideNavOpen(): boolean {
		// eslint-disable-next-line no-underscore-dangle
		return this._sideNavOpen;
	}

	set sideNavOpen(value) {
		// eslint-disable-next-line no-underscore-dangle
		this._sideNavOpen = value;
		this.sideNavOpenChange.emit(this._sideNavOpen);
	}

	@Output() sideNavOpenChange = new EventEmitter();

	isCustomerPage: boolean;

	private _sideNavOpen: boolean;

	constructor(
		private router: Router
	) {
	}

	ngOnInit(): void {
		this.router.events.subscribe(value => {
			if (value instanceof NavigationEnd) {
				this.isCustomerPage = value.url.includes('customers');
			}
		});
	}

}
