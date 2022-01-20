import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginroutingModule } from './loginrouting.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    LoginComponent
  ],
  imports: [
    CommonModule,
    LoginroutingModule,
    ReactiveFormsModule
  ],
  exports: [
    LoginComponent
  ]
})
export class LoginModule { }
