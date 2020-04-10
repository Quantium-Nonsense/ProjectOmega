import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { IonicModule } from '@ionic/angular';
import { ListLoaderComponent } from './component/list-loader/list-loader.component';

@NgModule({
  declarations: [
    ListLoaderComponent
  ],
  imports: [
    CommonModule,
    IonicModule,
    MatBottomSheetModule
  ],
  exports: [
    ListLoaderComponent,
    CommonModule,
    IonicModule
  ],
  entryComponents: [
    ListLoaderComponent
  ]
})
export class SharedModule {
}
