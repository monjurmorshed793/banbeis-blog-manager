import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DivisionRoutingModule } from './division-routing.module';
import { DivisionComponent } from './list/division.component';
import { DivisionUpdateComponent } from './update/division-update.component';


@NgModule({
  declarations: [
    DivisionComponent,
    DivisionUpdateComponent
  ],
  imports: [
    CommonModule,
    DivisionRoutingModule
  ]
})
export class DivisionModule { }
