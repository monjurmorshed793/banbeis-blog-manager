import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DesignationComponent} from "./designation.component";
import {DesignationUpdateComponent} from "./update/designation-update.component";

const routes: Routes = [
  {
    path: '',
    component: DesignationComponent,
  },
  {
    path: 'new',
    component: DesignationUpdateComponent
  },
  {
    path: 'edit',
    component: DesignationUpdateComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DesignationRoutingModule { }
