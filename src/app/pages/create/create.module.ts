import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CreateRoutingModule } from './create-routing.module';
import { ListComponent } from '../list/list.component';
import { CreateComponent } from './create.component';
import {ReactiveFormsModule} from "@angular/forms";


@NgModule({
  declarations: [
    ListComponent,
    CreateComponent
  ],
    imports: [
        CommonModule,
        CreateRoutingModule,
        ReactiveFormsModule
    ]
})
export class CreateModule { }
