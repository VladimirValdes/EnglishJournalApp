import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConnectorsComponent } from './connectors.component';
import { ConnectorsRouting } from './connectorsRouting.module';
import { ReactiveFormsModule } from '@angular/forms';
import { SearchbarModule } from 'src/app/components/searchbar/searchbar.module';



@NgModule({
  declarations: [
    ConnectorsComponent,
  ],
  imports: [
    CommonModule,
    ConnectorsRouting,
    ReactiveFormsModule,
    SearchbarModule,
  ],
})
export class ConnectorsModule { }
