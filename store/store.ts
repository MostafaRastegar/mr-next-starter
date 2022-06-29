import { createStore, AnyAction, Store, applyMiddleware } from 'redux';
import { createWrapper, Context, HYDRATE } from 'next-redux-wrapper';
import rootReducer, { RootReducerI } from './rootReducer';
import { loadingBarMiddleware } from 'react-redux-loading-bar';
import thunk from 'redux-thunk';

const bindMiddleware = (middleware: any[]) => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension');
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

// create a makeStore function
const makeConfiguredStore = (reducer) =>
  createStore(
    reducer,
    undefined,
    bindMiddleware([thunk, loadingBarMiddleware()]),
  );

const reducerGenerator = (state: any, action: AnyAction) => {
  if (action.type === HYDRATE) {
    const nextState = {
      ...state,
      ...action.payload,
    };
    return nextState;
  }

  return rootReducer(state, action);
};

const makeStore = (props) => {
  const isServer = typeof window === 'undefined';
  if (isServer) {
    return makeConfiguredStore(reducerGenerator);
  } else {
    // we need it only on client side
    const { persistStore, persistReducer } = require('redux-persist');
    const storage = require('redux-persist/lib/storage').default;

    const persistConfig = {
      key: 'nextjs',
      storage,
    };

    const persistedReducer = persistReducer(persistConfig, reducerGenerator);
    const store = makeConfiguredStore(persistedReducer);

    store.__persistor = persistStore(store); // Nasty hack

    return store;
  }
};

// export an assembled wrapper
export const wrapper = createWrapper<Store<RootReducerI>>(makeStore, {
  debug: true,
});
