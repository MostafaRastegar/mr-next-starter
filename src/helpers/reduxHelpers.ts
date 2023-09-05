import { AnyObjectI } from '@/app/interfaces';
import { UsersReducersType } from '@/app/users/reducers';
import { AnyAction } from 'redux';
const actionTypes = ['REQUEST', 'SUCCESS', 'FAILURE'];

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
  if (type === actionTypes[0]) {
    return request;
  }
  if (type === actionTypes[1]) {
    return success;
  }
  if (type === actionTypes[2]) {
    return failure;
  }
  return state;
};

export const makeActionTypesObject = (actionTypeName: string) => {
  const result: { [key: string]: string } = {};

  actionTypes.forEach((action) => {
    result[`${actionTypeName}_${action}`] = `${actionTypeName}_${action}`;
  });

  return result;
};

export const makeActionsObject = (typePrefix: string) => {
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
