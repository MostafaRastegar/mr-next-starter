import { AnyAction } from 'redux';
import { mergeStates } from 'helpers/reduxHelpers';
import { InitialTemplateI } from 'store/interfaces';
import usersTypes from './types';

export type UsersReducersType = InitialTemplateI<DataI>;
type DataI = { id: number; userName: string; password: string }[];
const initialState: UsersReducersType = {
  loading: false,
  data: null,
  error: false,
};

const users = (state = initialState, action: AnyAction) => {
  const { request, success, failure } = mergeStates(state, action.payload);
  switch (action.type) {
    case usersTypes.GET_USERS_REQUEST:
      return request;
    case usersTypes.GET_USERS_SUCCESS:
      return success;
    case usersTypes.GET_USERS_FAILURE:
      return failure;
    default:
      return state;
  }
};

export default users;
