import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home.component';
import { MatGridListModule } from '@angular/material/grid-list'; 
import { MatCardModule } from '@angular/material/card'; 
import { QueueTopModule } from '../queue-top/queue-top.module';
import { QueueAgentModule } from '../queue-agent/queue-agent.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [
	QueueTopModule,
	QueueAgentModule,
	MatGridListModule,
	MatCardModule,
    CommonModule,
  ]
})

export class HomeModule { }
