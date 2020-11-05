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
import {  reducers } from './store/reducers';

@NgModule({
  declarations: [
    AppComponent,
    QueueComponent
  ],
  imports: [
	HttpClientModule,
    BrowserModule,
    BrowserAnimationsModule,
	MatGridListModule,
	 StoreModule.forRoot(reducers, {
    
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
