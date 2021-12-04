import endpoints from 'constants/endpoints';
import request from 'store/request';

const usersServices = {
  getAllUsersService() {
    const url = endpoints.USERS.GET_ALL_USERS_SERVICE();
    return request.get(url);
  },
};

export default usersServices;
