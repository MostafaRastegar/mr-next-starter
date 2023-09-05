import React from 'react';
import type { GetStaticPropsResult } from 'next';
import styled from 'styled-components';
import { usersEffects } from '@/app';
import { wrapper } from '@/app/store';
import Users from '@/components//Pages/UsersSSR';

const Title = styled.h1`
  color: red;
`;

const MainPage = () => (
  <div>
    <Title>My First Next.js Page</Title>
    <Users />
  </div>
);

export const getServerSideProps = wrapper.getServerSideProps(
  (store) => async (): Promise<GetStaticPropsResult<{}>> => {
    await store.dispatch(usersEffects.getUsersRequest() as any);
    return { props: {} };
  },
);
export default MainPage;
