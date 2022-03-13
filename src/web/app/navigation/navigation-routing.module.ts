import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {NavigationComponent} from "./navigation.component";
import {NavigationUpdateComponent} from "./update/navigation-update.component";
import {NavigationDetailComponent} from "./navigation-detail/navigation-detail/navigation-detail.component";

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
  },
  {
    path: 'detail',
    component: NavigationDetailComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavigationRoutingModule { }
