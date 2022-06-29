import { createStore, applyMiddleware, AnyAction } from 'redux';
import { createWrapper, HYDRATE } from 'next-redux-wrapper';
import createWebStorage from 'redux-persist/lib/storage/createWebStorage';
import { loadingBarMiddleware } from 'react-redux-loading-bar';
import thunk from 'redux-thunk';

import rootReducer from './rootReducer';

const bindMiddleware = (middleware: any[]) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

const reducer = (state: any, action: AnyAction) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    return nextState;
  }

  return rootReducer(state, action);
};

const initStore = () => {
  console.log('typeof window !== :>> ', typeof window !== 'undefined');
  return createStore(reducer, bindMiddleware([thunk, loadingBarMiddleware()]));
};

export const wrapper = createWrapper(initStore);
