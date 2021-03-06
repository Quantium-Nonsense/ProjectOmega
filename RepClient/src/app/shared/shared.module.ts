import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonModule } from '@angular/material/button';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { IonicModule } from '@ionic/angular';
import { AddRemoveItemComponent } from './component/add-remove-item/add-remove-item.component';
import { HeaderComponent } from './component/header/header.component';
import { ListDisplayBottomSheetComponent } from './component/list-display-bottom-sheet/list-display-bottom-sheet.component';
import { ListLoaderComponent } from './component/list-loader/list-loader.component';

@NgModule({
  declarations: [
    ListLoaderComponent,
    ListDisplayBottomSheetComponent,
    HeaderComponent,
    AddRemoveItemComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    MatBottomSheetModule,
    MatIconModule,
    MatBadgeModule,
    MatButtonModule,
    MatMenuModule,
    MatDividerModule,
    MatSnackBarModule
  ],
  exports: [
    CommonModule,
    HeaderComponent,
    IonicModule,
    ListLoaderComponent,
    ListDisplayBottomSheetComponent,
    MatBottomSheetModule,
    MatDividerModule,
    MatMenuModule,
    MatButtonModule,
    MatBadgeModule,
    MatIconModule,
    MatSnackBarModule,
    AddRemoveItemComponent,
    HttpClientModule

  ],
  entryComponents: [
    ListDisplayBottomSheetComponent
  ]
})
export class SharedModule {
}
