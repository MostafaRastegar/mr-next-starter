import styled from 'styled-components';
import { color, px } from 'constants/theme/helpers';

export const StyledUsersWrapper = styled.div`
  position: relative;
  background-color: ${color('green', 'light')};
  padding: ${px(30)};
`;
export const StyledUsersTitle = styled.span`
  padding-bottom: ${px(30)};
  color: ${color('blue', 'dark')};
`;
