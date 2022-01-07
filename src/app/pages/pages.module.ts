import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';

import { PagesroutingModule } from './pagesrouting.module';

@NgModule({
  declarations: [
    PagesComponent,
  ],
  imports: [
    CommonModule,
    PagesroutingModule,
    SharedModule,
  ],
  exports: [
    PagesComponent
  ]
})
export class PagesModule { }
