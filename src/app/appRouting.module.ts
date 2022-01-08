import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PagesroutingModule } from './pages/pagesrouting.module';
import { LoginroutingModule } from './auth/login/loginrouting.module';



const routes: Routes = [
    { path: 'login', loadChildren: () => 
          import('./auth/login/login.module').then( m => m.LoginModule) 
    },
    // { path: 'dashboard', loadChildren: () => 
    //       import('./pages/pages.module').then( m => m.PagesModule) },
    // { path: '', redirectTo: 'login', pathMatch: 'full'},
    // { path: '**', component: Login }
    { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes),
        PagesroutingModule,
        LoginroutingModule
    ],
    exports: [RouterModule]
})
export class appRouting {}
