// Imports: Dependencies
import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading-bar';
import users, { UsersReducersType } from './users/reducers';

export interface LoadingReducersI {
  default: number;
}
export interface RootReducerI {
  users?: UsersReducersType;
  loadingBar?: LoadingReducersI;
}

// Redux: Root Reducer
const rootReducer = combineReducers({
  users,
  loadingBar: loadingBarReducer,
});

// Exports
export default rootReducer;
