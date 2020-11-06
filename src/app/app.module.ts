import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatGridListModule } from '@angular/material/grid-list';
import { QueueComponent } from './queue/queue.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { HttpClientModule } from '@angular/common/http';
import { rootEffects } from './store/effects';
import {  metaReducers, reducers } from './store/reducers';
import { HomeComponent } from './home/home.component';
import { QueueTopComponent } from './queue-top/queue-top.component';
import { QueueContentComponent } from './queue-content/queue-content.component';
import { QueueFooterComponent } from './queue-footer/queue-footer.component';
import { QueueAgentComponent } from './queue-agent/queue-agent.component';

@NgModule({
  declarations: [
    AppComponent,
    QueueComponent,
    HomeComponent,
    QueueTopComponent,
    QueueContentComponent,
    QueueFooterComponent,
    QueueAgentComponent
  ],
  imports: [
	HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
	MatGridListModule,
	 StoreModule.forRoot(reducers, {
      metaReducers,
      runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true,
      }
    }),
	
	EffectsModule.forRoot(rootEffects),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
