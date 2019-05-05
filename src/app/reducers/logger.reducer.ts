import { Action } from '@ngrx/store';

import { ActionTypes, LogError } from '../actions/logger.actions';

export function loggerReducer(state = 0, action: LogError) {
    switch (action.type) {
        case ActionTypes.LOG_ERROR:
            return { error: action.payload };
        default:
            console.log('in loggerReducer with', action);
            return state;
    }
}

