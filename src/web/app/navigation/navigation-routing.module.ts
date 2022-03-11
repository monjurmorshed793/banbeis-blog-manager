import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NavigationComponent} from "./navigation.component";
import {NavigationUpdateComponent} from "./update/navigation-update.component";

const routes: Routes = [
  {
    path: '',
    component: NavigationComponent
  },
  {
    path: 'new',
    component: NavigationUpdateComponent
  },
  {
    path: 'edit',
    component: NavigationUpdateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavigationRoutingModule { }
