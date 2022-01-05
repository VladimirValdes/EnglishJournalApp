import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerbsComponent } from './verbs.component';



@NgModule({
  declarations: [
    VerbsComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    VerbsComponent  
  ]
})
export class VerbsModule { }
