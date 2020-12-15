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

import { QueueMemberAddedEvent, QueueMemberRemovedEvent, QueueMemberStatusEvent, BridgeEvent, AgentCalledEvent, CurrentQueue, Agent, QueueContents, QueueCallerAbandonEvent, AgentConnectEvent } from '../models/callboard.models';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';


const CHANNEL_ABANDON = '/abandon';
const CHANNEL_ADD_AGENT = '/add';
const CHANNEL_REMOVE_AGENT = '/remove';
const CHANNEL_CHANGE_STATE = '/change';
const CHANNEL_BRIDGE = '/bridge';
const CHANNEL_CALL = '/call';
const AGENT_CONNECT = '/connect';
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
	
  agentStateMap = new Map([
	["0", "primary"],
	["1", "success"],
	["2", "info"],
	["3", "warning"],
	["4", "dark"],
	["5", "secondary"],
	["6", "danger"],
	["7", "danger"],
	["8", "light"],
	
  ]); 



  private serverUrl = 'http://localhost:8080/socket'
  private title = 'WebSockets chat';
  private stompClient;	

  
 
  colSize: number;
  queues: CurrentQueue[];
  queues$: Observable<CurrentQueue[]> = this.store.select(callboardSelector.getAllQueues);

  constructor(private httpClient: HttpClient, 
	
		private store: Store<fromStore.IState>) {
	
		this.initializeWebSocketConnection(store);
	
  }
  
  getAgentColor(agentState: string){
   
	 return this.agentStateMap.get(agentState);

 }
  agentFullName(agent: Agent){
     return agent.number.substring(4, agent.number.length) + ' ' + agent.name;	
 }
  ngAfterViewInit(): void {
     
  }
  ngOnInit(): void {

	this.queues$.subscribe(res=> {
		
		this.queues = res;
		this.colSize = Math.round(12/res.length);
		console.log(res);
		
	
	});

  }

  initializeWebSocketConnection(store: Store<fromStore.IState>){
	   let ws = new SockJS(this.serverUrl);
	   this.stompClient = Stomp.over(ws);
	   let that = this;
	   this.stompClient.connect({}, function(frame) {
	
		
		   that.stompClient.subscribe(CHANNEL_ABANDON, (message) => {
	       if(message.body) {
			 	let res: QueueCallerAbandonEvent = JSON.parse(message.body);
	         	
	     	}
	     });
		
	     that.stompClient.subscribe(CHANNEL_ADD_AGENT, (message) => {
	       if(message.body) {
			 	let res: QueueMemberAddedEvent = JSON.parse(message.body);
	         
				store.dispatch(callboardAction.addAgent({queue: res.queue, agentNumber: res.membername, agentName: '',  agentState: res.status}));
	     	}
	     });
	     that.stompClient.subscribe(CHANNEL_REMOVE_AGENT, (message) => {
	         if(message.body) {
			 	let res: QueueMemberRemovedEvent = JSON.parse(message.body);
	         
				store.dispatch(callboardAction.removeAgent({queue: res.queue, agentNumber: res.membername}));
	     	}
	     });
 		 that.stompClient.subscribe(CHANNEL_CHANGE_STATE, (message) => {
			
	        if(message.body) {
			 	let res: QueueMemberStatusEvent = JSON.parse(message.body);
				store.dispatch(callboardAction.setAgentState({queue: res.queue, agentNumber: res.membername, agentState: res.status}));
	          
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

	  that.stompClient.subscribe(AGENT_CONNECT, (message) => {
	     
	        if(message.body) {
			 	let res: AgentConnectEvent = JSON.parse(message.body);
	          	store.dispatch(callboardAction.incCalls({queue: res.queue, agentNumber: res.memberName}));
	     	}
	     
	     });

	   });
	 }
  sendMessage(message){
    this.stompClient.send("/app/send/message" , {}, message);
    $('#input').val('');
  }
}
