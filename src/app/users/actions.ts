import { makeActionsObject } from '@/helpers/reduxHelpers';
import types from './types';

const usersActions = {
  ...makeActionsObject(types.GET_USERS),
};
export default usersActions;
