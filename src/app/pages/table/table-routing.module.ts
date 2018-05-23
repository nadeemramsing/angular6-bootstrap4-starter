import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TableComponent } from './table.component';
import { Table1Component } from './table1/table1.component';

const routes: Routes = [{
  path: '',
  component: TableComponent,
  children: [
    {
      path: 'table1',
      component: Table1Component
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TableRoutingModule { }

export const routedComponents = [
  TableComponent,
  Table1Component
];
