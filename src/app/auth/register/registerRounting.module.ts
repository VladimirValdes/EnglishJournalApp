import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoggedGuard } from 'src/app/guards/logged.guard';
import { RegisterComponent } from './register.component';


const routes: Routes = [
  {
    path: 'register', 
    component: RegisterComponent, 
    canActivate: [ LoggedGuard ],
    data: { title: 'Register' },

  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class RegisterRoutingModule { }
