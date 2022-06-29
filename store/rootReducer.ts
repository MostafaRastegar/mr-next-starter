// Imports: Dependencies
import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading-bar';
import users, { UsersReducersType } from './users/reducers';
import users2 from './users2/reducers';

export interface LoadingReducersI {
  default: number;
}
export interface RootReducerI {
  users?: UsersReducersType;
  users2?: UsersReducersType;
  loadingBar?: LoadingReducersI;
}

// Redux: Root Reducer
const rootReducer = combineReducers({
  users,
  users2,
  loadingBar: loadingBarReducer,
});

// Exports
export default rootReducer;
