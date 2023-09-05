import { ActionObjectType, AnyObjectI } from '@/app/interfaces';

export const actionMaker =
  (type: string) =>
  (payload = {}) => ({
    type,
    payload,
  });

export const makeActionsObject = (actionName: string): ActionObjectType => ({
  request: `${actionName}_REQUEST`,
  success: `${actionName}_SUCCESS`,
  failure: `${actionName}_FAILURE`,
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
