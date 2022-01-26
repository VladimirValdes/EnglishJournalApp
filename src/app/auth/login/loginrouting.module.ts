import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
// import { LoggedGuard } from 'src/app/guards/logged.guard';
import { LoginComponent } from './login.component';


const routes: Routes = [
  {
    path: 'login', 
    component: LoginComponent, 
    // canActivate: [ LoggedGuard ],
    // canLoad: [ LoggedGuard ],
    data: { title: 'Login' },

  },
];

@NgModule({
  imports: [ RouterModule.forChild(routes) ],
  exports: [ RouterModule ],
})
export class LoginroutingModule { }
