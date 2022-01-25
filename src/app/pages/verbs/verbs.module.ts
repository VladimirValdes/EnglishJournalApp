import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerbsComponent } from './verbs.component';
import { VerbsRouting } from './verbsRouting.module';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    VerbsComponent,
  ],
  imports: [
    CommonModule,
    VerbsRouting,
    ReactiveFormsModule,
  ],
  exports: [
    VerbsComponent,  
  ],
})
export class VerbsModule { }
