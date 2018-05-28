import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableRoutingModule, routedComponents } from './table-routing.module';

import { NrPaginationComponent } from './../../common/components/nr-pagination/nr-pagination.component';


@NgModule({
  imports: [
    CommonModule,
    TableRoutingModule
  ],
  declarations: [
    ...routedComponents,
    NrPaginationComponent
  ]
})
export class TableModule { }
