import { AnyObjectI } from '@/app/interfaces';
import { UsersReducersType } from '@/app/users/reducers';
import { AnyAction } from 'redux';
type ActionMaker = {
  type: string;
  payload?: Record<string, any>;
};

export const actionMaker =
  (type: string) =>
  (payload = {}) => ({
    type,
    payload,
  });

export const errObject = (response: AnyObjectI) => ({
  status: response.status,
  problem: response.problem,
  data: response,
});

export const mergeStates = <T>(state: AnyObjectI, payload: T) => {
  return {
    request: {
      ...state,
      ...{ loading: true, data: null, error: false },
    },
    success: {
      ...state,
      ...{ loading: false, data: payload, error: false },
    },
    failure: {
      ...state,
      ...{ loading: false, data: null, error: true },
    },
  };
};

export const reducerMaker = (state: UsersReducersType, action: AnyAction) => {
  const { request, success, failure } = mergeStates(state, action.payload);
  const type = action.type.split('_').pop();
  if (type === 'REQUEST') {
    return request;
  }
  if (type === 'SUCCESS') {
    return success;
  }
  if (type === 'FAILURE') {
    return failure;
  }
  return state;
};

export const makeActionTypesObject = (actionTypeName: string) => {
  const actionTypes = ['REQUEST', 'SUCCESS', 'FAILURE'];
  const result: { [key: string]: string } = {};

  actionTypes.forEach((action) => {
    result[`${actionTypeName}_${action}`] = `${actionTypeName}_${action}`;
  });

  return result;
};

export const makeActionsObject = (typePrefix: string) => {
  const actionTypes = ['REQUEST', 'SUCCESS', 'FAILURE'];
  const result: Record<string, (payload?: any) => ActionMaker> = {};

  actionTypes.forEach((action) => {
    result[`${typePrefix}_${action}`] = actionMaker(`${typePrefix}_${action}`);
  });

  return result;
};

export const initialState: UsersReducersType = {
  loading: false,
  data: null,
  error: false,
};
