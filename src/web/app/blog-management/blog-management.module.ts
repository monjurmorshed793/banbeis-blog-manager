import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BlogManagementRoutingModule } from './blog-management-routing.module';
import { BlogManagementComponent } from './blog-management.component';
import {MaterialModule} from "../shared/material.module";


@NgModule({
  declarations: [
    BlogManagementComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    BlogManagementRoutingModule
  ]
})
export class BlogManagementModule { }
