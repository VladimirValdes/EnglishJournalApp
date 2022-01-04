import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { CardtotalModule } from '../components/cardtotal/cardtotal.module';



@NgModule({
  declarations: [
    PagesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CardtotalModule
  ],
  exports: [
    PagesComponent
  ]
})
export class PagesModule { }
