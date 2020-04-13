import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatBottomSheet, MatBottomSheetModule, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './component/header/header.component';
import { ListDisplayBottomSheetComponent } from './component/list-display-bottom-sheet/list-display-bottom-sheet.component';
import { ListLoaderComponent } from './component/list-loader/list-loader.component';

@NgModule({
  declarations: [
    ListLoaderComponent,
    ListDisplayBottomSheetComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    MatBottomSheetModule
  ],
  exports: [
    CommonModule,
    HeaderComponent,
    IonicModule,
    ListLoaderComponent,
    ListDisplayBottomSheetComponent,
    MatBottomSheetModule
  ],
  entryComponents: [
    ListDisplayBottomSheetComponent
  ]
})
export class SharedModule {
}
