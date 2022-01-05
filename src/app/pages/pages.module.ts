import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { CardtotalModule } from '../components/cardtotal/cardtotal.module';
import { VerbsModule } from './verbs/verbs.module';



@NgModule({
  declarations: [
    PagesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CardtotalModule,
    VerbsModule
  ],
  exports: [
    PagesComponent
  ]
})
export class PagesModule { }
