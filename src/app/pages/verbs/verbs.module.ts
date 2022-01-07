import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerbsComponent } from './verbs.component';
import { VerbsRouting } from './verbsRouting.module';



@NgModule({
  declarations: [
    VerbsComponent
  ],
  imports: [
    CommonModule,
    VerbsRouting
  ],
  exports: [
    VerbsComponent  
  ]
})
export class VerbsModule { }
