import { Dispatch, AnyAction } from 'redux';
// import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { errObject } from '@/helpers/reduxHelpers';
import usersActions from './actions';
import usersServices from './services';

const usersEffects = {
  getUsersRequest: () => async (dispatch: Dispatch<AnyAction>) => {
    dispatch(usersActions.GET_USERS_REQUEST());
    const response = await usersServices.getUsersService();
    const { data } = response;
    if (data) {
      dispatch(usersActions.GET_USERS_SUCCESS(data));

      return data;
    }

    dispatch(usersActions.GET_USERS_FAILURE(errObject(response)));

    return null;
  },
};

export default usersEffects;
