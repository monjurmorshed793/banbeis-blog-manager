import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DivisionComponent} from "./list/division.component";
import {DivisionUpdateComponent} from "./update/division-update.component";

const routes: Routes = [
  {
    path: '',
    component: DivisionComponent
  },
  {
    path: 'new',
    component: DivisionUpdateComponent
  },
  {
    path:'edit',
    component: DivisionUpdateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DivisionRoutingModule { }
