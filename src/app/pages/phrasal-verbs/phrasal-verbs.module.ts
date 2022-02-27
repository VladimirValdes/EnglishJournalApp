import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PhrasalVerbsComponent } from './phrasal-verbs.component';
import { PhrasalVerbRouting } from './phrasalRouting.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchbarModule } from 'src/app/components/searchbar/searchbar.module';
import { PaginationModule } from 'src/app/components/pagination/pagination.module';


@NgModule({
  declarations: [
    PhrasalVerbsComponent,
  ],
  imports: [
    CommonModule,
    PhrasalVerbRouting,
    ReactiveFormsModule,
    SearchbarModule,
    PaginationModule,
  ],
})
export class PhrasalVerbsModule { }
