import { Action, createReducer, on } from '@ngrx/store';

import * as callboardAction from '../../store/actions/callboard.actions';
import {  CurrentQueue, Agent } from 'src/app/models/callboard.models';

export const AdminKey = 'Administration';

export interface IState {
	
	queues: CurrentQueue[];
		
}
export const initialState: IState = {
 
	 queues: [] 

}


const callboardReducer = createReducer(

  initialState,



 on(callboardAction.removeAgent, (state, { queue, agentNumber }) =>{

	const agents: Agent[] = state.queues.filter(f=>f.queue === queue)[0].members.filter(f=> f.number.toUpperCase() !== agentNumber.toUpperCase() );
	
	
	const obj = {...state, queues: state.queues.map(q=>{
		return q.queue === queue ? {queue: q.queue, callers: q.callers, members: agents} : q;
	})}
	console.log(obj);
	return obj;
	
  }),

 on(callboardAction.addAgent, (state, { queue, agentNumber, agentName, agentState }) =>{


	const agent: Agent = {number: agentNumber, name: agentName, state: agentState, calls: 0};
	
	const obj = {...state, queues: state.queues.map(q=>{
		return q.queue === queue ? {queue: q.queue, callers: q.callers, members: [...q.members, agent]} : q;
	})}

	return obj;
	
  }),




  on(callboardAction.setAgentState, (state, { queue, agentNumber, agentState }) =>{
	
	const obj = {
		...state, queues: state.queues.map(r=> {
			return r.queue === queue ? {queue: r.queue, callers: r.callers, members: r.members.map(m=> {
				return m.number.toUpperCase() === agentNumber.toUpperCase() ? {number: m.number, name: m.name, state: agentState, calls: m.calls} : m;
			})} : r;
		})
	}
	console.log(agentState);
	return obj;
	
  }),

 on(callboardAction.incCalls, (state, { queue, agentNumber }) =>{
	
	const obj = {
		...state, queues: state.queues.map(r=> {
			return r.queue === queue ? {queue: r.queue, callers: r.callers, members: r.members.map(m=> {
				return m.number.toUpperCase() === agentNumber.toUpperCase() ? {number: m.number, name: m.name, state: m.state, calls: m.calls + 1} : m;
			})} : r;
		})
	}
	
	return obj;
	
  }),

 on(callboardAction.loadQueuesSuccess, (state, { queues }) =>{
	
	
	const obj = {
		...state, queues: queues
	}
	console.log(obj);
	return {
		...state, queues: queues
	}
  }),

)

export function reducer(state: IState = initialState, action: Action) {
  return callboardReducer(state, action);
}





	