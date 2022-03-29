import React from 'react';
import styled from 'styled-components';
import { usersEffects } from 'store';
import { wrapper } from 'store/store';
import Users from 'components/Pages/Users';

const Title = styled.h1`
  color: red;
`;

const MainPage = () => (
  <div>
    <Title>My First Next.js Page</Title>
    <Users />
  </div>
);

export const getServerSideProps = wrapper.getServerSideProps((store) => async () => {
  await store.dispatch(usersEffects.getUsersRequest());
})
export default MainPage;