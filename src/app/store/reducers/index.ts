import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';

import * as fromCallboard from '../reducers/callboard.reducers';

export interface IState {
 
  callboard: fromCallboard.IState;
}

export const reducers: ActionReducerMap<IState> = {
  callboard: fromCallboard.reducer,


};