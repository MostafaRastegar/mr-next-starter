import { ActionObjectType, AnyObjectI } from 'store/interfaces';

export const actionMaker = (type: string) => (payload = {}) => ({
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
