import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { VerbsComponent } from './verbs.component';
import { VerbsRouting } from './verbsRouting.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchbarModule } from 'src/app/components/searchbar/searchbar.module';



@NgModule({
  declarations: [
    VerbsComponent,
  ],
  imports: [
    CommonModule,
    VerbsRouting,
    ReactiveFormsModule,
    SearchbarModule,
  ],
  exports: [
    VerbsComponent,  
  ],
})
export class VerbsModule { }
