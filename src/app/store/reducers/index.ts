import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';

import * as fromCallboard from '../reducers/callboard.reducers';

import { environment } from 'src/environments/environment';

export interface IState {
 
  callboard: fromCallboard.IState;
}

export const metaReducers: Array<MetaReducer<IState>> = !environment.production ? [] : [];

export const reducers: ActionReducerMap<IState> = {

  callboard: fromCallboard.reducer,


};