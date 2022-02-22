import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DetectwidthDirective } from './detectwidth.directive';



@NgModule({
  declarations: [
    DetectwidthDirective,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    DetectwidthDirective,
  ],
})
export class DirectivesModule { }
