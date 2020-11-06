import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { MatGridListModule } from '@angular/material/grid-list'; 
import { MatCardModule } from '@angular/material/card'; 
import { QueueAgentComponent } from './queue-agent.component';


@NgModule({
  declarations: [QueueAgentComponent],
  imports: [
	MatGridListModule,
	MatCardModule,
    CommonModule,
  ],
 exports: [
    QueueAgentComponent
  ]
})

export class QueueAgentModule { }
