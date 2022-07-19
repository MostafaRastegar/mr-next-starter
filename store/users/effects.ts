import { Dispatch, AnyAction } from 'redux';
import { showLoading, hideLoading } from 'react-redux-loading-bar';

import { effectsHandler } from 'helpers/reduxHelpers';
import usersActions from './actions';
import usersServices from './services';

const usersEffects = {
  getUsersRequest: () => async (dispatch: Dispatch<AnyAction>) => {
    // const requestHandler = effectsHandler(dispatch, [
    //   usersActions.getUsersRequest,
    //   usersActions.getUsersSuccess,
    //   usersActions.getUsersFailure,
    // ]);
    // const responseHandler = await requestHandler(
    //   usersServices.getUsersService,
    //   [],
    // );
    // return responseHandler(200, null);
    const requestHandler = effectsHandler(dispatch, [
      usersActions.getUsersRequest,
      usersActions.getUsersSuccess,
      usersActions.getUsersFailure,
    ]);
    return (await requestHandler(usersServices.getUsersService, []))(200, null);
  },
};

export default usersEffects;
