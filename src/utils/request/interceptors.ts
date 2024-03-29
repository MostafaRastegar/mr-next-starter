import {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import Cookies from 'js-cookie';
import axiosRetry from 'axios-retry';

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  const accessToken = Cookies.get('accessToken');
  if (accessToken && accessToken !== 'null') {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  } else {
    delete config.headers['Authorization'];
  }

  return config;
};

const onRequestError = (error: AxiosError) => {
  return Promise.reject(error);
};

// const generateResponse = (response: AxiosResponse) => {
//   return {
//     data: response.data,
//     status: response?.status,
//     message: response?.data?.message,
//   };
// };

const onResponse = (response: AxiosResponse): AxiosResponse => response;

const onResponseError = async (error: AxiosError) => {
  // if (error?.response?.data?.error)
  // alert("Error!: " + error?.response?.data?.error);

  // if (!error.response) {
  //   exceptionHandlers.handle503();
  // }
  // const exceptionHandlersMethod = (status) => `handle${status}`;
  // // @ts-ignore
  // exceptionHandlers[exceptionHandlersMethod(error.response.status)]();

  if (error.response.status === 401) {
    // return logoutCleanUp();
    return false;
  }
  return Promise.reject(error?.response?.data);
};

const retryRequest = (axiosInstance: AxiosInstance) => {
  axiosRetry(axiosInstance, {
    retries: 1,
    retryDelay: (retryCount) => {
      return retryCount * 1500;
    },
  });
};

export const setupInterceptorsTo = (
  axiosInstance: AxiosInstance,
  withHeader = true,
): AxiosInstance => {
  retryRequest(axiosInstance);
  if (withHeader) {
    // @ts-ignore
    axiosInstance.interceptors.request.use(onRequest, onRequestError);
  }
  axiosInstance.interceptors.response.use(onResponse, onResponseError);

  return axiosInstance;
};
