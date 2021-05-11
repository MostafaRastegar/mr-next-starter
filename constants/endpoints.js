/* eslint-disable prefer-destructuring */
// const HOSTURL = process.env.HOSTURL;
const HOSTURL = 'https://fakerestapi.azurewebsites.net';

export default {
  CONFIGURATION: {
    GET_CONFIGURATION_SERVICE: () =>
      `${HOSTURL}/configuration/api/v1/configurations`,
  },
  USERS: {
    GET_ALL_USERS_SERVICE: () => `${HOSTURL}/api/v1/Users`,
  },
};
