import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Action, Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { catchError,  map, switchMap, } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';

import * as callboardAction from '../../store/actions/callboard.actions';

import { IState } from '../reducers/callboard.reducers';
import { QueueContents } from 'src/app/models/callboard.models';

const serviceURL = environment.serviceURL;
const url_queues = 'init';


@Injectable()
export class CallBoardEffects {
 

  loadQueues: Observable<Action> = createEffect(() =>
    this.actions$.pipe(
	  ofType(callboardAction.loadQueues),
      switchMap(() => {
	   return  this.httpClient.get<QueueContents>(`${serviceURL}${url_queues}`).pipe(
		switchMap((content: QueueContents) => {
	  		return [callboardAction.loadQueuesSuccess({queues: content.queues})];		
		})
   	 )
         
    }),
    catchError(err =>{ console.log(err); return  of(callboardAction.loadQueuesFail)})
    ));


  constructor(
	private httpClient: HttpClient,
    private actions$: Actions,
    private store: Store<IState>,
	 
  ) {
	

  }
 
}
