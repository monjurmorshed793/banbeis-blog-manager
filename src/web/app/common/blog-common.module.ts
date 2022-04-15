import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommonBreadcrumbComponent } from './common-breadcrumb/common-breadcrumb.component';
import {BreadcrumbModule} from "primeng/breadcrumb";
import {MessageModule} from "primeng/message";
import {ToastModule} from "primeng/toast";



@NgModule({
  declarations: [
    CommonBreadcrumbComponent
  ],
  exports: [
    CommonBreadcrumbComponent
  ],
  imports: [
    CommonModule,
    BreadcrumbModule,
    MessageModule,
    ToastModule
  ]
})
export class BlogCommonModule { }
