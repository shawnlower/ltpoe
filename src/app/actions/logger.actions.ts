import { Action } from '@ngrx/store';


export enum ActionTypes {
  LOG_ERROR = '[Logger] Log Error',
}

export class LogError implements Action {
    readonly type = ActionTypes.LOG_ERROR;

    constructor(readonly payload: { message: string }) { }
}

