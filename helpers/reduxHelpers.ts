import { ActionObjectType, AnyObjectI } from 'store/interfaces';
import { STATUS_LOADING, STATUS_FAILED, STATUS_SUCCESS } from 'constants/redux';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { Dispatch, AnyAction } from 'redux';

export const actionMaker =
  (type: string) =>
  (payload = {}) => ({
    type,
    payload,
  });

export const makeActionsObject = (actionName: string): ActionObjectType => ({
  Handler: `${actionName}_Handler`,
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

export function reducerUpdaterHandler<T, U>(state: T) {
  return function (status: string, data?: U) {
    return {
      ...state,
      status,
      data,
    };
  };
}

export function reducerActionHandler<T, U>(
  typesArray: [string, string, string],
  state: T,
  payload?: {
    data: U;
  },
) {
  return {
    [typesArray[0]]: () =>
      reducerUpdaterHandler<T, null>(state)(STATUS_LOADING),

    [typesArray[1]]: () =>
      reducerUpdaterHandler<T, U>(state)(STATUS_SUCCESS, payload.data),

    [typesArray[2]]: () =>
      reducerUpdaterHandler<T, null>(state)(STATUS_FAILED, null),
  };
}

async function requestHandler(
  dispatch: Dispatch<AnyAction>,
  action: Function,
  services: Function,
  config: any[],
) {
  dispatch(showLoading());
  dispatch(action());
  return await services(...config);
}

function responseMapper(
  response: {
    status: number;
    data: any[];
  },
  statusCode: number,
  // eslint-disable-next-line no-unused-vars
  dataMapper?: (v: AnyObjectI[]) => AnyObjectI[],
) {
  if (response.status === statusCode) {
    return dataMapper ? dataMapper(response.data) : response.data;
  }
  return null;
}
function successHandler(
  dispatch: Dispatch<AnyAction>,
  action: Function,
  data: AnyObjectI | any[],
) {
  if (data) {
    dispatch(action(data));
    dispatch(hideLoading());
    return data;
  }
  return null;
}

function failureHandler(
  dispatch: Dispatch<AnyAction>,
  action: Function,
  response: AnyObjectI,
) {
  dispatch(action(errObject(response)));
}

export function effectsHandler(
  dispatch: Dispatch<AnyAction>,
  actions: Function[],
) {
  return async (services: Function, config: any[]) => {
    const response = await requestHandler(
      dispatch,
      actions[0],
      services,
      config,
    );
    return (
      statusCode: number,
      // eslint-disable-next-line no-unused-vars
      dataMapper?: (v: AnyObjectI[]) => AnyObjectI[],
    ) => {
      responseMapper(response, statusCode, dataMapper)
        ? successHandler(
            dispatch,
            actions[1],
            responseMapper(response, statusCode, dataMapper),
          )
        : failureHandler(dispatch, actions[2], response);
    };
  };
}
