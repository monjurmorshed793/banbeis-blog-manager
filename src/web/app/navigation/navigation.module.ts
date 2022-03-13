import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NavigationRoutingModule } from './navigation-routing.module';
import { NavigationComponent } from './navigation.component';
import {BreadcrumbModule} from "primeng/breadcrumb";
import {PanelModule} from "primeng/panel";
import {CardModule} from "primeng/card";
import {TableModule} from "primeng/table";
import {ButtonModule} from "primeng/button";
import {ToastModule} from "primeng/toast";
import {MessageModule} from "primeng/message";
import {ToolbarModule} from "primeng/toolbar";
import { NavigationUpdateComponent } from './update/navigation-update.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {AutoCompleteModule} from "primeng/autocomplete";
import { NavigationDetailComponent } from './navigation-detail/navigation-detail/navigation-detail.component';

@NgModule({
  declarations: [
    NavigationComponent,
    NavigationUpdateComponent,
    NavigationDetailComponent
  ],
  imports: [
    CommonModule,
    NavigationRoutingModule,
    BreadcrumbModule,
    PanelModule,
    CardModule,
    TableModule,
    ButtonModule,
    MessageModule,
    ToastModule,
    ToolbarModule,
    FormsModule,
    ReactiveFormsModule,
    InputTextModule,
    AutoCompleteModule
  ]
})
export class NavigationModule { }
