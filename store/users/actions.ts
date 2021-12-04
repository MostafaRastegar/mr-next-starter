import { actionMaker } from 'helpers/reduxHelpers';
import usersTypes from './types';

const usersActions = {
  getAllUsersRequest: actionMaker(usersTypes.GET_ALL_USERS_REQUEST),
  getAllUsersSuccess: actionMaker(usersTypes.GET_ALL_USERS_SUCCESS),
  getAllUsersFailure: actionMaker(usersTypes.GET_ALL_USERS_FAILURE),
};
export default usersActions;
