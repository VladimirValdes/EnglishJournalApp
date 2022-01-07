import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';
import { CardtotalModule } from '../components/cardtotal/cardtotal.module';
import { VerbsModule } from './verbs/verbs.module';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginModule } from '../auth/login/login.module';
import { PhrasalVerbsComponent } from './phrasalVerbs/phrasal-verbs/phrasal-verbs.component';

@NgModule({
  declarations: [
    PagesComponent,
    PhrasalVerbsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    CardtotalModule,
    VerbsModule,
    // LoginModule,
    BrowserAnimationsModule
  ],
  exports: [
    PagesComponent
  ]
})
export class PagesModule { }
