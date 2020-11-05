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

import { Queue } from './models/callboard.models';

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
	
 
  private serverUrl = 'http://localhost:8080/socket'
  private title = 'WebSockets chat';
  private stompClient;	

   tiles: Tile[] = [
    {text: 'One', cols: 1, rows: 1, color: 'lightblue'},
    {text: 'Two', cols: 1, rows: 1, color: 'lightgreen'},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
    {text: 'Four', cols: 1, rows: 1, color: '#DDBDF1'}
   
  ];
 
  queues: Queue[];
  queues$: Observable<Queue[]> = this.store.select(callboardSelector.getAllQueues);

  constructor(private httpClient: HttpClient, private store: Store<fromStore.IState>) {

	this.initializeWebSocketConnection();
	
  }
  ngAfterViewInit(): void {
     
  }
  ngOnInit(): void {
     
	 this.store.dispatch(callboardAction.loadQueues()); 

  }

  initializeWebSocketConnection(){
	   let ws = new SockJS(this.serverUrl);
	   this.stompClient = Stomp.over(ws);
	   let that = this;
	   this.stompClient.connect({}, function(frame) {
	     that.stompClient.subscribe("/chat", (message) => {
	       if(message.body) {
	         $(".chat").append("<div class='message'>"+message.body+"</div>")
	         console.log(message.body);
	       }
	     });
	   });
	 }
  sendMessage(message){
    this.stompClient.send("/app/send/message" , {}, message);
    $('#input').val('');
  }
}
