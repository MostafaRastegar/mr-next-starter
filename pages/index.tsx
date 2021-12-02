import styled from 'styled-components';
import Users from 'components/Pages/Users';

export default () => (
  <div>
    <Title>My First Next.js Page</Title>
    <Users />
  </div>
);

const Title = styled.h1`
  color: red;
`;
