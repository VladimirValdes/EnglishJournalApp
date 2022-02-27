import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PrepositionsComponent } from './prepositions.component';
import { prepositionRouting } from './prepositionRouting.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchbarModule } from 'src/app/components/searchbar/searchbar.module';
import { PaginationModule } from 'src/app/components/pagination/pagination.module';



@NgModule({
  declarations: [
    PrepositionsComponent,
  ],
  imports: [
    CommonModule,
    prepositionRouting,
    ReactiveFormsModule,
    SearchbarModule,
    PaginationModule,
  ],
})
export class PrepositionsModule { }
