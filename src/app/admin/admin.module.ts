import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminComponent } from './admin.component';

import { AgmCoreModule } from '@agm/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [AdminComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    AdminRoutingModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyBm-7WaBO8rULlt8_IyOpfQUf0sBXEifSI',
      libraries: ['places']
    })
  ]
})
export class AdminModule { }
