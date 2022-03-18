import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DesignationRoutingModule } from './designation-routing.module';
import { DesignationComponent } from './designation.component';
import {TableModule} from "primeng/table";
import {BanbeisSharedServicesModule} from "banbeis-shared-services";
import { DesignationUpdateComponent } from './update/designation-update.component';
import {BreadcrumbModule} from "primeng/breadcrumb";
import {ToastModule} from "primeng/toast";
import {ToolbarModule} from "primeng/toolbar";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {CardModule} from "primeng/card";
import {InputTextModule} from "primeng/inputtext";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    DesignationComponent,
    DesignationUpdateComponent
  ],
  imports: [
    CommonModule,
    DesignationRoutingModule,
    TableModule,
    BanbeisSharedServicesModule,
    BreadcrumbModule,
    ToastModule,
    ToolbarModule,
    ButtonModule,
    RippleModule,
    CardModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class DesignationModule { }
