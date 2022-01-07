import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PrepositionsComponent } from './prepositions.component';


const routes: Routes = [
    { path: '', 
      component: PrepositionsComponent,
      data: { title: 'Prepositions'} },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class prepositionRouting {}
