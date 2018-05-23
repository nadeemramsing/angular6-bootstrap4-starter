import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableRoutingModule } from './table-routing.module';
import { Table1Component } from './table1/table1.component';
import { TableComponent } from './table.component';

@NgModule({
  imports: [
    CommonModule,
    TableRoutingModule
  ],
  declarations: [Table1Component, TableComponent]
})
export class TableModule { }
