import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: 'dashboard',
    loadChildren: ()=> import('./dashboard/dashboard.module').then(m=> m.DashboardModule)
  },
  {
    path: 'navigation',
    loadChildren: ()=> import('./navigation/navigation.module').then(m=> m.NavigationModule)
  },
  {
    path: 'designation',
    loadChildren: ()=> import('./designation/designation.module').then(m=> m.DesignationModule)
  },
  {
    path:'division',
    loadChildren: ()=> import('./division/division.module').then(m=> m.DivisionModule)
  },
  {
    path: '**',
    redirectTo: 'dashboard'
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
