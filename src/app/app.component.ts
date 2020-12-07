import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatGridListModule } from '@angular/material/grid-list'; 
import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import $ from 'jquery';

import * as fromStore from './store/reducers/callboard.reducers';
import * as callboardSelector from './store/selectors/callboard.selectors';
import * as callboardAction from './store/actions/callboard.actions';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';



export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, AfterViewInit{
	
 
 
  constructor(private httpClient: HttpClient, private store: Store<fromStore.IState>) {

	
	
  }
  ngAfterViewInit(): void {
     
  }
  ngOnInit(): void {
     
	this.store.dispatch(callboardAction.loadQueues());

  }

  
}
