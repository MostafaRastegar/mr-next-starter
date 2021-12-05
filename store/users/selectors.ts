import { createSelector } from 'reselect';
import { RootStore } from 'store/interfaces';

const getUsers = (state: RootStore) => state.users;

const usersSelectors = {
  getUsersData: createSelector(getUsers, (users) => users?.data),
  getUsersLoading: createSelector(getUsers, (users) => users?.loading),
};

export default usersSelectors;
