import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnectorsComponent } from './connectors.component';
import { ConnectorsRouting } from './connectorsRouting.module';



@NgModule({
  declarations: [
    ConnectorsComponent
  ],
  imports: [
    CommonModule,
    ConnectorsRouting
  ]
})
export class ConnectorsModule { }
