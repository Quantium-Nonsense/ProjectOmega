import { TextFieldModule } from '@angular/cdk/text-field';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatTableModule } from '@angular/material/table';
import { PopupDialogComponent } from './components/popup-dialog/popup-dialog.component';
import { TableFilterComponent } from './components/table-filter/table-filter.component';
import { PrettyRolePipe } from './pipes/pretty-role.pipe';

@NgModule({
  declarations: [
    TableFilterComponent,
    PopupDialogComponent,
    PrettyRolePipe
  ],
  imports: [
    FlexLayoutModule,
    CommonModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogModule,
    MatButtonModule,
    MatProgressBarModule,
    MatTableModule,
    MatPaginatorModule,
    MatIconModule,
    MatMenuModule,
    TextFieldModule
  ],
  exports: [
    HttpClientModule,
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
    MatMenuModule,
    TextFieldModule,
    PrettyRolePipe
  ]

})
export class SharedModule {
}
