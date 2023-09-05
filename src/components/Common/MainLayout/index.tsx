import { ContainerView } from './styles';

const MainLayout = ({ children }: { children: React.ReactChild }) => (
  <ContainerView>{children}</ContainerView>
);

export default MainLayout;
