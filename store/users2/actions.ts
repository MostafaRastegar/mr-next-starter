import { actionMaker } from 'helpers/reduxHelpers';
import usersTypes from './types';

const usersActions = {
  getUsersFailure: actionMaker(usersTypes.GET_USERS_FAILURE),
  getUsersRequest2: actionMaker(usersTypes.GET_USERS_REQUEST2),
  getUsersSuccess2: actionMaker(usersTypes.GET_USERS_SUCCESS2),
};
export default usersActions;
