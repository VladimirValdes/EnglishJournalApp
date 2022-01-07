import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AdjectivesComponent } from './adjectives.component';

const routes: Routes = [

    {
        path: '',
        component: AdjectivesComponent,
        data: { title: 'Adjectives'}
    }

 
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class adjectivesRouting {}
