import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SettingsComponent } from './settings.component';
import { SettingsRouting } from './settingsRouting.module';
import { PipesModule } from 'src/app/pipes/pipes.module';



@NgModule({
  declarations: [
    SettingsComponent,
  ],
  imports: [
    CommonModule,
    SettingsRouting,
    PipesModule,
  ],
  exports: [
    SettingsComponent,
  ],
})
export class SettingsModule { }
