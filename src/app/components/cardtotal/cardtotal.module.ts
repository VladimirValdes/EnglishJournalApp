import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardtotalComponent } from './cardtotal.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    CardtotalComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports: [
    CardtotalComponent,
  ],
})
export class CardtotalModule { }
