import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TableRoutingModule, routedComponents } from './table-routing.module';

@NgModule({
  imports: [
    CommonModule,
    TableRoutingModule
  ],
  declarations: [...routedComponents]
})
export class TableModule { }
