import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginroutingModule } from './loginrouting.module';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginroutingModule,
  ],
  exports: [
    LoginComponent
  ]
})
export class LoginModule { }
