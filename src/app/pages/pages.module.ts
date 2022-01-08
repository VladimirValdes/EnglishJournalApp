import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PagesComponent } from './pages.component';
import { SharedModule } from '../shared/shared.module';

import { PagesroutingModule } from './pagesrouting.module';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    PagesComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SharedModule,
  ],
  exports: [
    PagesComponent
  ]
})
export class PagesModule { }
