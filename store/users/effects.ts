// import { showLoading, hideLoading } from 'react-redux-loading-bar';
import { ActionInterface, AnyObjectI } from 'store/interfaces';
import { Dispatch } from 'redux';
import { errObject } from 'helpers/reduxHelpers';
import usersActions from './actions';
import usersServices from './services';

const usersEffects = {
  getAllUsersRequest: () => async (
    dispatch: Dispatch<ActionInterface<AnyObjectI>>,
  ) => {
    dispatch(usersActions.getAllUsersRequest());

    const response = await usersServices.getAllUsersService();
    const { data } = response;

    if (data) {
      dispatch(usersActions.getAllUsersSuccess(data));
      return data;
    }

    dispatch(usersActions.getAllUsersFailure(errObject(response)));
    return false;
  },
};

export default usersEffects;
