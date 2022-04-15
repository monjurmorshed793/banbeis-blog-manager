import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DivisionRoutingModule } from './division-routing.module';
import { DivisionComponent } from './list/division.component';
import { DivisionUpdateComponent } from './update/division-update.component';
import {TableModule} from "primeng/table";
import {BanbeisSharedServicesModule} from "../../../../../banbeis-shared-service/dist/banbeis-shared-services";
import {BreadcrumbModule} from "primeng/breadcrumb";
import {ToastModule} from "primeng/toast";
import {ToolbarModule} from "primeng/toolbar";
import {RippleModule} from "primeng/ripple";
import {CardModule} from "primeng/card";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {ButtonModule} from "primeng/button";
import {BlogCommonModule} from "../common/blog-common.module";


@NgModule({
  declarations: [
    DivisionComponent,
    DivisionUpdateComponent
  ],
  imports: [
    CommonModule,
    DivisionRoutingModule,
    TableModule,
    BanbeisSharedServicesModule,
    BreadcrumbModule,
    ToastModule,
    ToolbarModule,
    RippleModule,
    CardModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule,
    ButtonModule,
    BlogCommonModule
  ]
})
export class DivisionModule { }
