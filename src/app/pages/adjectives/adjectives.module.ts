import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdjectivesComponent } from './adjectives.component';
import { adjectivesRouting } from './adjectivesRouting.module';



@NgModule({
  declarations: [
    AdjectivesComponent
  ],
  imports: [
    CommonModule,
    adjectivesRouting
  ]
})
export class AdjectivesModule { }
