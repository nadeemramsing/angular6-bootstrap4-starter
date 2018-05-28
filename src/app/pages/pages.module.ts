import { NgModule } from '@angular/core';
import { CommonModule } from "@angular/common";

//Modules
import { PagesRoutingModule } from './pages-routing.module';

//Components
import { PagesComponent } from './pages.component';
import { NavbarComponent } from './../common/components/navbar/navbar.component';

const PAGES_COMPONENTS = [
  PagesComponent,
  NavbarComponent
];

@NgModule({
  imports: [
    PagesRoutingModule,
    CommonModule
  ],
  declarations: [
    ...PAGES_COMPONENTS
  ]
})
export class PagesModule { }
