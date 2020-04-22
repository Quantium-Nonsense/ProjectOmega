import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FlexLayoutModule} from '@angular/flex-layout';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatProgressBarModule} from '@angular/material/progress-bar';
import {MatTableModule} from '@angular/material/table';
import {PopupDialogComponent} from './components/popup-dialog/popup-dialog.component';
import {TableFilterComponent} from './components/table-filter/table-filter.component';
import {MatMenu, MatMenuModule} from '@angular/material/menu';

@NgModule({
	declarations: [
		TableFilterComponent,
		PopupDialogComponent
	],
	imports: [
		FlexLayoutModule,
		CommonModule,
		MatFormFieldModule,
		MatInputModule,
		MatDialogModule,
		MatButtonModule,
		MatProgressBarModule,
		MatTableModule,
		MatPaginatorModule,
		MatIconModule,
		MatMenuModule
	],
	exports: [
		FlexLayoutModule,
		CommonModule,
		TableFilterComponent,
		MatFormFieldModule,
		MatInputModule,
		MatDialogModule,
		MatButtonModule,
		MatProgressBarModule,
		MatTableModule,
		MatPaginatorModule,
		MatIconModule,
		MatMenuModule
	]

})
export class SharedModule {
}
