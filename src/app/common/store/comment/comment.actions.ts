import { Action } from '@ngrx/store';

export enum CommentActionTypes {
    LOAD = '[Comment] LOAD Requested',
    CREATE = '[Comment] CREATE Requested',
    UPDATE = '[Comment] UPDATE Requested',
    REMOVE = '[Comment] REMOVE Requested',
    ERROR = '[Comment] Error'
}

export class LoadAction implements Action {
    type = CommentActionTypes.LOAD;
    constructor(public payload: { comments: any[] }) { }
}

export class CreateAction implements Action {
    type = CommentActionTypes.CREATE;
    constructor(public payload: { comment: any }) { }
}

export class UpdateAction implements Action {
    type = CommentActionTypes.UPDATE;
    constructor(public payload: { id: string, comment: any }) { }
}

export class RemoveAction implements Action {
    type = CommentActionTypes.REMOVE;
    constructor(public payload: { id: string }) { }
}

export class ErrorAction implements Action {
    type = CommentActionTypes.ERROR;
    constructor(public payload: any) { }
}

export type CommentAction =
    LoadAction
    |
    CreateAction
    |
    UpdateAction
    |
    RemoveAction
    |
    ErrorAction;