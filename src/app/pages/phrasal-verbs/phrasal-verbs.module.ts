import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhrasalVerbsComponent } from './phrasal-verbs.component';
import { PhrasalVerbRouting } from './phrasalRouting.module';



@NgModule({
  declarations: [
    PhrasalVerbsComponent
  ],
  imports: [
    CommonModule,
    PhrasalVerbRouting
  ]
})
export class PhrasalVerbsModule { }
