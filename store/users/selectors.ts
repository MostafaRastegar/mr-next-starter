import { createSelector } from 'reselect';
import { RootStore } from 'store/interfaces';

const getUsers = (state: RootStore) => state.users;

export default {
  getAllUsersData: createSelector(getUsers, (users) => users.allUsers.data),
  getAllUsersLoading: createSelector(
    getUsers,
    (users) => users.allUsers.loading,
  ),
};
