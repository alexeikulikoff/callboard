import { Component, OnInit, AfterViewInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import $ from 'jquery';

import * as fromStore from '../store/reducers/callboard.reducers';
import * as callboardSelector from '../store/selectors/callboard.selectors';
import * as callboardAction from '../store/actions/callboard.actions';
import { Store, createAction } from '@ngrx/store';
import { Observable, throwError, of } from 'rxjs';

import { QueueMemberAddedEvent, QueueMemberRemovedEvent, QueueMemberStatusEvent, BridgeEvent, AgentCalledEvent, CurrentQueue, Agent, QueueContents } from '../models/callboard.models';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';

const CHANNEL_ADD_AGENT = '/add';
const CHANNEL_REMOVE_AGENT = '/remove';
const CHANNEL_CHANGE_STATE = '/change';
const CHANNEL_BRIDGE = '/bridge';
const CHANNEL_CALL = '/call';
const CHANNEL_INIT_QUEUES = '/init';


const serviceURL = environment.serviceURL;
const url_queues = 'init';

export interface Tile {
 
  text: string;
  agents: Agent[];
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
    {text: 'callcenter', agents: [{number: '1', name: 'agent1'}, {number: '2', name: 'agent2'}, ]},
    {text: 'covid', agents: [{number: '1', name: 'agent1'}, {number: '2', name: 'agent2'}, ]},
   
  ];
 
  queues: CurrentQueue[];
  queues$: Observable<CurrentQueue[]> = this.store.select(callboardSelector.getAllQueues);

  constructor(private httpClient: HttpClient, private store: Store<fromStore.IState>) {

	this.initializeWebSocketConnection();
	
	
  }
  

  ngAfterViewInit(): void {
     
  }
  ngOnInit(): void {

	this.queues$.subscribe(res=> {
		
		this.queues = res;
		console.log(this.queues);
	
	});

  }

  initializeWebSocketConnection(){
	   let ws = new SockJS(this.serverUrl);
	   this.stompClient = Stomp.over(ws);
	   let that = this;
	   this.stompClient.connect({}, function(frame) {
		
		
		
	     that.stompClient.subscribe(CHANNEL_ADD_AGENT, (message) => {
	       if(message.body) {
			 	let res: QueueMemberAddedEvent = JSON.parse(message.body);
	         	console.log(res);
	     	}
	     });
	     that.stompClient.subscribe(CHANNEL_REMOVE_AGENT, (message) => {
	         if(message.body) {
			 	let res: QueueMemberRemovedEvent = JSON.parse(message.body);
	          	console.log(res);
	     	}
	     });
 		 that.stompClient.subscribe(CHANNEL_CHANGE_STATE, (message) => {
	         if(message.body) {
			 	let res: QueueMemberStatusEvent = JSON.parse(message.body);
	          	console.log(res);
	     	}
	     });
 		that.stompClient.subscribe(CHANNEL_BRIDGE, (message) => {
	        if(message.body) {
				let res: BridgeEvent = JSON.parse(message.body);
	          	console.log(res);
	     	}
	     });
		that.stompClient.subscribe(CHANNEL_CALL, (message) => {
	     
	        if(message.body) {
			 	let res: AgentCalledEvent = JSON.parse(message.body);
	          	console.log(res);
	     	}
	     
	     });

	   });
	 }
  sendMessage(message){
    this.stompClient.send("/app/send/message" , {}, message);
    $('#input').val('');
  }
}
