import { createAction, props } from '@ngrx/store';
import { CurrentQueue,  } from 'src/app/models/callboard.models';

export const loadQueues = createAction('[LOAD] Load Queues');

export const loadQueuesFail = createAction('[LOAD] Load Queues Fail');

export const loadQueuesSuccess = createAction('[LOAD] Load Queues Success', props<{ queues: CurrentQueue[] }>());

export const setAgentState = createAction('[SET] Agent State', props<{ queue: string, agentNumber: string,  agentState: string }>());

export const addAgent = createAction('[ADD] Add Agent', props<{ queue: string, agentNumber: string, agentName: string, agentState: string }>());

export const removeAgent = createAction('[REMOVE] Remove Agent', props<{ queue: string, agentNumber:  string }>());


export const incCalls = createAction('[INC] Increment agents calls', props<{ queue: string, agentNumber:  string }>());

export const decQueueCalls = createAction('[DEC] Decrement queue calls', props<{ queue: string }>());

export const incQueueCalls = createAction('[INC] Increment queue calls', props<{ queue: string }>());