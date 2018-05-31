import { CommentAction, CommentActionTypes } from './comment.actions';
import { commentInitialState, CommentState } from './comment.state';

export function commentReducer(state: CommentState = commentInitialState, action: CommentAction): CommentState {
    switch (action.type) {
        case CommentActionTypes.LOAD:
            return Object.assign({}, state, {
                comments: action.payload.comment
            });

        case CommentActionTypes.CREATE:
            return Object.assign({}, state, {
                error: null,
                comments: [...state.comments, action.payload.comment]
            });

        case CommentActionTypes.UPDATE:
            return Object.assign({}, state, {
                error: null,
                comments: state.comments.map((comment: any) => {
                    return comment.id === action.payload.id ? action.payload.comment : comment;
                })
            });

        case CommentActionTypes.REMOVE:
            return Object.assign({}, state, {
                error: null,
                comments: state.comments.filter((comment: any) => {
                    return comment.id !== action.payload.id;
                })
            });

        default:
            return state;
    }
}