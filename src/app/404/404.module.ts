import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NotfoundComponent } from './notfound/notfound.component';
import { NotFoundRouting } from './404routing.module';



@NgModule({
  declarations: [
    NotfoundComponent,
  ],
  imports: [
    CommonModule,
    NotFoundRouting,
  ],
  exports: [
    NotfoundComponent,
  ],
})
export class NotFoundModule { }
