import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ConnectorsComponent } from './connectors.component';



const routes: Routes = [
    

    { path: '', 
      component: ConnectorsComponent,
      data: { title: 'Connectors'}  },
    
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class FeatureRoutingModule {}
