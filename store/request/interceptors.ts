import axios, {
  AxiosError,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
} from 'axios';
import Cookies from 'js-cookie';

// import { useDispatch } from 'react-redux';
// import { customerActions } from 'store';

const onRequest = (config: AxiosRequestConfig): AxiosRequestConfig => {
  const accessToken = Cookies.get('accessToken');
  if (accessToken && accessToken !== 'null') {
    config.headers['Authorization'] = `Bearer ${accessToken}`;
  } else {
    delete config.headers['Authorization'];
  }

  return config;
};

const onRequestError = (error: AxiosError): Promise<AxiosError> => {
  return Promise.reject(error);
};

const onResponse = (response: AxiosResponse): AxiosResponse => {
  return response;
};

const onResponseError = async (error: any): Promise<any> => {
  // console.log('error.response:>> ', error.response);
  // dispatch(customerActions.postTokenWebLoginFailure(errObject(error.response)));
  if (!error.response) {
    return {
      status: 503,
      data: null,
      problem: 'Network Error',
    };
  }
  if (error.response) {
    if (error.response.status === 403) {
      console.log('please login :>> ');
    }
    if (error.response.status === 401) {
      // Access Token was expired
      const accessToken = Cookies.get('accessToken');
      const refreshToken = Cookies.get('refreshToken');

      try {
        const rs = await axios.post('/refresh-token-api', {
          RefreshToken: refreshToken,
          AccessToken: accessToken,
        });

        const { AccessToken, RefreshToken } = rs.data;

        Cookies.set('accessToken', AccessToken);
        Cookies.set('refreshToken', RefreshToken);

        return rs.data;
      } catch (_error) {
        return Promise.reject(_error);
      }
    }
  }
  return error.response;
};

export const setupInterceptorsTo = (
  axiosInstance: AxiosInstance,
): AxiosInstance => {
  axiosInstance.interceptors.request.use(onRequest, onRequestError);
  axiosInstance.interceptors.response.use(onResponse, onResponseError);
  return axiosInstance;
};
