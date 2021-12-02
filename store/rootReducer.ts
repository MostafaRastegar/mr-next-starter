// Imports: Dependencies
import { combineReducers } from 'redux';
import { loadingBarReducer } from 'react-redux-loading-bar';
import users from './users/reducers';

// Imports: Reducers

// Redux: Root Reducer
const rootReducer = combineReducers({
  users,
  loadingBar: loadingBarReducer,
});

// Exports
export default rootReducer;
