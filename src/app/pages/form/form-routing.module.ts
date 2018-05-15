import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { FormComponent } from './form.component';
import { Form1Component } from './form1/form1.component';
import { Form2Component } from './form2/form2.component';

const routes: Routes = [{
  path: '',
  component: FormComponent,
  children: [
    {
      path: 'form1',
      component: Form1Component
    },
    {
      path: 'form2',
      component: Form2Component
    }
  ]
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FormRoutingModule { }

export const routedComponents = [
  FormComponent,
  Form1Component,
  Form2Component,
];
