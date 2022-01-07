import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrepositionsComponent } from './prepositions.component';
import { prepositionRouting } from './prepositionRouting.module';



@NgModule({
  declarations: [
    PrepositionsComponent
  ],
  imports: [
    CommonModule,
    prepositionRouting
  ]
})
export class PrepositionsModule { }
