import { createStore, applyMiddleware } from 'redux';
import { createWrapper } from "next-redux-wrapper";
import createWebStorage from "redux-persist/lib/storage/createWebStorage";
import { loadingBarMiddleware } from 'react-redux-loading-bar';
import thunk from 'redux-thunk';
import rootReducer, { RootReducerI } from './rootReducer';
// import { useMemo } from 'react';
// import { composeWithDevTools } from 'redux-devtools-extension';
// import { persistReducer } from 'redux-persist';

const bindMiddleware = (middleware: any[]) => {
  if (process.env.NODE_ENV !== "production") {
    const { composeWithDevTools } = require("redux-devtools-extension");
    return composeWithDevTools(applyMiddleware(...middleware));
  }
  return applyMiddleware(...middleware);
};

// add redux loading bar middleware
const loadingMD = loadingBarMiddleware({
  promiseTypeSuffixes: ['REQUEST', 'SUCCESS', 'FAILURE'],
});

const createNoopStorage = () => {
  return {
    getItem(_key) {
      return Promise.resolve(null);
    },
    setItem(_key, value) {
      return Promise.resolve(value);
    },
    removeItem(_key) {
      return Promise.resolve();
    },
  };
};

const makeStore = ({ isServer ,initialState}:{isServer?: boolean; initialState?: RootReducerI}) => {
  if (isServer) {
    return createStore(rootReducer, bindMiddleware([thunk, loadingMD]));
  } else {
    const { persistStore, persistReducer } = require("redux-persist");

    const storage =
      typeof window !== "undefined"
        ? createWebStorage("local")
        : createNoopStorage();
    const persistConfig = {
      key: "myProject",
      storage,
    };

    const persistedReducer = persistReducer(persistConfig, rootReducer);
    const store = createStore(
      persistedReducer,
      initialState,
      bindMiddleware([thunk, loadingMD])
    );

    store.__persistor = persistStore(store);

    return store;
  }
};



export const wrapper = createWrapper(makeStore, {
  debug: false,
});


// const reducer = (state, action) => {
//   if (action.type === HYDRATE) {
//     const nextState = {
//       ...state, // use previous state
//       ...action.payload, // apply delta from hydration
//     }
//     return nextState
//   } else {
//     return rootReducer(state, action)
//   }
// }

// export const initializeStore = (initialState:RootReducerI) => {
//   let _store = store ?? makeStore({initialState, isServer: typeof window === "undefined"});

//   // After navigating to a page with an initial Redux state, merge that state
//   // with the current state in the store, and create a new store
//   if (initialState && store) {
//     _store = makeStore({
//       ...store.getState(),
//       ...initialState,
//     });
//     // Reset the current store
//     store = undefined;
//   }

//   // For SSG and SSR always create a new store
//   if (typeof window === 'undefined') return _store;
//   // Create the store once in the client
//   if (!store) store = _store;

//   return _store;
// };
// export function useStore(initialState: RootReducerI) {
//   const memoedStore = useMemo(() => initializeStore(initialState), [
//     initialState,
//   ]);
//   return memoedStore;
// }
