import rootReducer from 'store/rootReducer';
import { Dispatch } from 'redux';

export interface InitialTemplateI<U> {
  [key: string]: {
    loading: boolean;
    data?: U;
    error: boolean;
  };
}

export interface ActionInterface<T extends {}> {
  type: string;
  payload: T;
}

export interface DispatchGeneralInterface {
  type: string;
  payload?: {
    [key: string]: any;
  };
}

export type AppDispatchType = Dispatch;

export type ErrorInterface = {
  message?: string;
  causes?: any[];
  code?: number;
};
export type ErrorDataInterface = {
  causes?: [null];
  code?: string;
  detail?: string;
  exceptionClassName?: string;
  instance?: string;
  status?: number;
  timestamp?: number;
  title?: string;
  type?: string;
  message?: string;
};

export type ResponseType = {
  config: string;
  data?: any;
  duration: string;
  headers: string;
  ok: number;
  originalError: any;
  problem: string;
  status: number;
};

export type ActionObjectType = {
  request: string;
  success: string;
  failure: string;
};

// eslint-disable-next-line no-undef
export type RootStore = ReturnType<typeof rootReducer>;

export type AnyObjectI = {
  [key: string]: any;
};
