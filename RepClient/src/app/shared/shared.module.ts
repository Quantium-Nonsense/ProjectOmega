import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ListLoaderComponent } from './component/list-loader/list-loader.component';

@NgModule({
  declarations: [
    ListLoaderComponent
  ],
  imports: [
    CommonModule,
    IonicModule
  ],
  exports: [
    ListLoaderComponent,
    CommonModule,
    IonicModule
  ]
})
export class SharedModule {
}
