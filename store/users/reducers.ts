// import { Action, ActionCreator, Dispatch } from 'redux';
// import { ThunkAction } from 'redux-thunk';
import { ActionInterface, InitialTemplateI } from 'store/interfaces';

import usersTypes from './types';
type DataI = { id: number; userName: string; password: string }[];

export type UsersReducersType = InitialTemplateI<DataI>;

const initialState: UsersReducersType = {
  allUsers: {
    loading: false,
    data: null,
    error: false,
  },
};

const users = (state = initialState, action: ActionInterface<DataI>) => {
  switch (action.type) {
    // users requests
    case usersTypes.GET_ALL_USERS_REQUEST:
      return {
        ...state,
        allUsers: { loading: true, data: null, error: false },
      };
    case usersTypes.GET_ALL_USERS_SUCCESS:
      return {
        ...state,
        allUsers: { loading: false, data: action.payload, error: false },
      };
    case usersTypes.GET_ALL_USERS_FAILURE:
      return {
        ...state,
        allUsers: { loading: false, data: null, error: true },
      };
    default:
      return state;
  }
};

export default users;
