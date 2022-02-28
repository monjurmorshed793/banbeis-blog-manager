import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BlogManagementComponent } from './blog-management.component';

const routes: Routes = [
  {
    path: '',
    component: BlogManagementComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BlogManagementRoutingModule { }
