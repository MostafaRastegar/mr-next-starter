import endpoints from '@/constants/endpoints';
import request from '@/utils/request';

const usersServices = {
  getUsersService() {
    const url = endpoints.USERS.GET_USERS_SERVICE();
    return request.get(url);
  },
};

export default usersServices;
