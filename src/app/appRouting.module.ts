import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesroutingModule } from './pages/pagesrouting.module';
import { LoginroutingModule } from './auth/login/loginrouting.module';
// import { LoginroutingModule } from './auth/login/loginrouting.module';



const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    LoginroutingModule,
    PagesroutingModule,
  ],
  exports: [RouterModule],
})
export class AppRouting {}
