import { Dispatch } from 'redux';
import { Action } from '../actions';
import { ActionTypes } from '../action-types';
import { saveCells } from '../action-creators';
import { RootState } from '../reducers';

export const persistMiddleware = 
    ({ dispatch, getState } : { dispatch: Dispatch<Action>; getState: () => RootState }) => {
        let timer: any;
        return (next: (action: Action) => void) => 
        (action: Action) => {
            next(action);

            if ([
                ActionTypes.MOVE_CELL, 
                ActionTypes.UPDATE_CELL, 
                ActionTypes.INSERT_CELL_AFTER, 
                ActionTypes.DELETE_CELL
            ].includes(action.type)) {
                if (timer) {
                    clearTimeout(timer);
                }
                timer = setTimeout(() => {
                    saveCells()(dispatch, getState)

                }, 500)
            }
        };
}