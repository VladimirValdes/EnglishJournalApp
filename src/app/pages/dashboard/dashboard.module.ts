import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardComponent } from './dashboard.component';
import { CardtotalModule } from 'src/app/components/cardtotal/cardtotal.module';
import { DashboardroutingModule } from './dashboardRouting.module';
import { ChartsModule } from 'src/app/components/charts/charts.module';



@NgModule({
  declarations: [
    DashboardComponent,
  ],
  imports: [
    CommonModule,
    DashboardroutingModule,
    CardtotalModule,
    ChartsModule,
  ],
})
export class DashboardModule { }
