import { Action, createReducer, on } from '@ngrx/store';
import { Queue } from 'src/app/models/callboard.models';
import * as callboardAction from '../../store/actions/callboard.actions';

export interface IState {
	queues: Queue[];
		
}
export const initialState: IState = {
  queues: [],

}

const callboardReducer = createReducer(

  initialState,
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





	