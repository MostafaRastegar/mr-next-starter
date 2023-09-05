import { actionMaker } from '@/helpers/reduxHelpers';
import usersTypes from './types';

const usersActions = {
  getUsersRequest: actionMaker(usersTypes.GET_USERS_REQUEST),
  getUsersSuccess: actionMaker(usersTypes.GET_USERS_SUCCESS),
  getUsersFailure: actionMaker(usersTypes.GET_USERS_FAILURE),
};
export default usersActions;
