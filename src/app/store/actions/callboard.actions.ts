import { createAction, props } from '@ngrx/store';
import { Queue } from 'src/app/models/callboard.models';

export const loadQueues = createAction('[LOAD] Load Queues');

export const loadQueuesFail = createAction('[LOAD] Load Queues Fail');

export const loadQueuesSuccess = createAction('[LOAD] Load Queues Success', props<{ queues: Queue[] }>());

