import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { RouterModule } from '@angular/router';
import { SearchbarModule } from '../components/searchbar/searchbar.module';
import { PipesModule } from '../pipes/pipes.module';



@NgModule({
  declarations: [
    HeaderComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    RouterModule,
    SearchbarModule,
    PipesModule,
  ],
  exports: [
    SidebarComponent,
    HeaderComponent,
  ],
})
export class SharedModule { }
