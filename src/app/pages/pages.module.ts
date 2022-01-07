import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { CardtotalModule } from '../components/cardtotal/cardtotal.module';
import { VerbsModule } from './verbs/verbs.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    PagesComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CardtotalModule,
    VerbsModule,
    BrowserAnimationsModule
  ],
  exports: [
    PagesComponent
  ]
})
export class PagesModule { }
