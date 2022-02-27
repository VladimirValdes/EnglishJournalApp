import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdjectivesComponent } from './adjectives.component';
import { adjectivesRouting } from './adjectivesRouting.module';
import { SearchbarModule } from 'src/app/components/searchbar/searchbar.module';
import { ReactiveFormsModule } from '@angular/forms';
import { PaginationModule } from 'src/app/components/pagination/pagination.module';



@NgModule({
  declarations: [
    AdjectivesComponent,
  ],
  imports: [
    CommonModule,
    adjectivesRouting,
    SearchbarModule,
    ReactiveFormsModule,
    PaginationModule,
  ],
})
export class AdjectivesModule { }
