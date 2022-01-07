import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';



const routes: Routes = [
    { path: 'login', loadChildren: () => 
          import('./auth/login/login.module').then( m => m.LoginModule) 
    },
    { path: 'dashboard', loadChildren: () => 
          import('./pages/pages.module').then( m => m.PagesModule) },
    // { path: '', redirectTo: 'login', pathMatch: 'full'},
    // { path: '**', component: Login }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class appRouting {}
