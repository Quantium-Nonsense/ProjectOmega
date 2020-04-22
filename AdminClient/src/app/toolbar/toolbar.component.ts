import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';

@Component({
	selector: 'app-toolbar',
	templateUrl: './toolbar.component.html',
	styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {
	@Input() title: string;

	private _sideNavOpen: boolean;

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


	constructor() {
	}

	ngOnInit(): void {
	}

}
