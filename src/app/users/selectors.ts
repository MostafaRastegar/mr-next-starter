import { createSelector } from 'reselect';
import { RootStore } from '@/app/interfaces';

const getUsers = (state: RootStore) => state.users;

const usersSelectors = {
  getUsersResponse: createSelector(getUsers, (users) => users),
  getUsersData: createSelector(getUsers, (users) => users?.data),
  getUsersLoading: createSelector(getUsers, (users) => users?.loading),
};

export default usersSelectors;
