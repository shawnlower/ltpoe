import {
  ActionReducer,
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
  MetaReducer
} from '@ngrx/store';
import { environment } from '../../environments/environment';

import { loggerReducer } from './logger.reducer';

export interface State {

}

export const reducers: ActionReducerMap<State> = {
  logger: loggerReducer,
};


export const metaReducers: MetaReducer<State>[] = !environment.production ? [] : [];

