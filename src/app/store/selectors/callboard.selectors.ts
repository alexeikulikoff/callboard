import { createFeatureSelector, createSelector } from '@ngrx/store';

import { IState } from '../../store/reducers/callboard.reducers';


export const callboardState = createFeatureSelector<IState>('callboard');

export const selectQueues = (state: IState) => state.queues;

export const selectQueueByName = (state: IState, value: string) => state.queues.filter(s=>s.name === value)[0];


export const getAllQueues = createSelector(
  callboardState,
  selectQueues,
);


export const getQueueByName = createSelector(
  callboardState,
  selectQueueByName,
);
