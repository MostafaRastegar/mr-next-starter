import styled from 'styled-components';
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

export default MainPage;