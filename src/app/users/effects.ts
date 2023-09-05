import { Dispatch, AnyAction } from 'redux';
import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { errObject } from '@/helpers/reduxHelpers';
import usersActions from './actions';
import usersServices from './services';

const usersEffects = {
  getUsersRequest: () => async (dispatch: Dispatch<AnyAction>) => {
    dispatch(showLoading());
    dispatch(usersActions.getUsersRequest());
    const response = await usersServices.getUsersService();
    const { data } = response;
    if (data) {
      dispatch(usersActions.getUsersSuccess(data));
      dispatch(hideLoading());

      return data;
    }

    dispatch(usersActions.getUsersFailure(errObject(response)));
    dispatch(hideLoading());

    return false;
  },
};

export default usersEffects;
