import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { IonicModule } from '@ionic/angular';
import { MatModule } from './mat.module';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    HttpClientModule,
    MatModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    NoopAnimationsModule,
    HttpClientModule,
    MatModule
  ]
})
export class TestModule { }
