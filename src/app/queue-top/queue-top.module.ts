import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatGridListModule } from '@angular/material/grid-list'; 
import { MatCardModule } from '@angular/material/card'; 
import { QueueTopComponent } from './queue-top.component';

@NgModule({
  declarations: [QueueTopComponent],
  imports: [
	MatGridListModule,
	MatCardModule,
    CommonModule,
  ],
 exports: [
    QueueTopComponent
  ]
})

export class QueueTopModule { }
