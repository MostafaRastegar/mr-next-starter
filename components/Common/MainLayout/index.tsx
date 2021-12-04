import { ReactChildren } from 'react';
import PropTypes from 'prop-types';
import { ContainerView } from './styles';

const MainLayout = ({ children }: { children: ReactChildren }) => (
  <ContainerView>{children}</ContainerView>
);

export default MainLayout;
