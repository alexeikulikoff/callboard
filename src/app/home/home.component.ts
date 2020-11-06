import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import $ from 'jquery';

import * as fromStore from '../store/reducers/callboard.reducers';
import * as callboardSelector from '../store/selectors/callboard.selectors';
import * as callboardAction from '../store/actions/callboard.actions';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import { Queue } from '../models/callboard.models';


export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
  queue: Queue[];
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, AfterViewInit{
	
 
  private serverUrl = 'http://localhost:8080/socket'
  private title = 'WebSockets chat';
  private stompClient;	

   tiles: Tile[] = [
    {text: 'One', cols: 1, rows: 1, color: 'lightblue' , queue: [{id: 1, name: 'agent1'}, {id: 2, name: 'agent2'}, ]},
    {text: 'Two', cols: 1, rows: 1, color: 'lightgreen' , queue: [{id: 1, name: 'agent1'}, {id: 2, name: 'agent2'}, ]},
    {text: 'Three', cols: 1, rows: 1, color: 'lightpink',  queue: [{id: 1, name: 'agent1'}, {id: 2, name: 'agent2'},{id: 1, name: 'agent1'}, {id: 2, name: 'agent2'}, ]},
    {text: 'Four', cols: 1, rows: 1, color: '#DDBDF1',  queue: [{id: 1, name: 'agent1'}, {id: 2, name: 'agent2'}, ]}
   
  ];
 
  queues: Queue[];
  queues$: Observable<Queue[]> = this.store.select(callboardSelector.getAllQueues);

  constructor(private httpClient: HttpClient, private store: Store<fromStore.IState>) {

	this.initializeWebSocketConnection();
	
  }
  ngAfterViewInit(): void {
     
  }
  ngOnInit(): void {
     
	 this.queues$.subscribe(queues=> {
		if (queues != null){
				this.queues = queues
				console.log(queues);
		}
	
	  });

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
