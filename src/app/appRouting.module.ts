import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesroutingModule } from './pages/pagesrouting.module';
import { LoginroutingModule } from './auth/login/loginrouting.module';
import { NotfoundComponent } from './404/notfound/notfound.component';
import { RegisterRoutingModule } from './auth/register/registerRounting.module';



const routes: Routes = [
  { path: '', redirectTo: '/dashboard/home', pathMatch: 'full' },
  { path: '**', component: NotfoundComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { useHash: true }),
    LoginroutingModule,
    RegisterRoutingModule,
    PagesroutingModule,
  ],
  exports: [RouterModule],
})
export class AppRouting {}
