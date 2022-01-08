import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { DashboardroutingModule } from './dashboardrouting.module';
import { CardtotalModule } from 'src/app/components/cardtotal/cardtotal.module';



@NgModule({
  declarations: [
    DashboardComponent
  ],
  imports: [
    CommonModule,
    DashboardroutingModule,
    CardtotalModule
  ]
})
export class DashboardModule { }
