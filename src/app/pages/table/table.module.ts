import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MDBBootstrapModule } from 'angular-bootstrap-md';

import { TableRoutingModule, routedComponents } from './table-routing.module';

import { NrPaginationComponent } from './../../common/components/nr-pagination/nr-pagination.component';


@NgModule({
  imports: [
    CommonModule,
    TableRoutingModule,
    MDBBootstrapModule
  ],
  declarations: [
    ...routedComponents,
    NrPaginationComponent
  ]
})
export class TableModule { }
