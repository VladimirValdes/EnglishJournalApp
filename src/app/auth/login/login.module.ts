import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginroutingModule } from './loginrouting.module';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { SpinnerModule } from 'src/app/shared/spinner/spinner.module';



@NgModule({
  declarations: [
    LoginComponent,
  ],
  imports: [
    CommonModule,
    LoginroutingModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    SpinnerModule,
  ],
  exports: [
    LoginComponent,
  ],
})
export class LoginModule { }
