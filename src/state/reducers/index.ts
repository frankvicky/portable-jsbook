import { combineReducers } from 'redux';
import cellsReducers from './cellsReducer';
import bundlesReducer from './bundlesReducer';

const reducers = combineReducers({
    cells: cellsReducers,
    bundles: bundlesReducer
});

export default reducers;

//Define a type which is defined or described the overall structure of the state object inside of our redux store.
//And make sure react hook can apply the correct types to work with
export type RootState = ReturnType<typeof reducers>;

