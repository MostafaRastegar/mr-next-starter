import { useSelector } from 'react-redux';
import { usersSelectors } from 'store';
import { StyledUsersWrapper, StyledUsersTitle } from './styles';
import { RootStore } from 'store/interfaces';

const Users = () => {
  const usersData = useSelector((state: RootStore) =>
    usersSelectors.getUsersData(state),
  );

  const usersLoading = useSelector((state: RootStore) =>
    usersSelectors.getUsersLoading(state),
  );

  return (
    <>
      <StyledUsersWrapper>
        <StyledUsersTitle>List Of Names</StyledUsersTitle>
        {usersLoading ? (
          <span>Loading ....</span>
        ) : (
          <div>
            {usersData?.map((item: { id: number; userName: string }) => (
              <p key={item.id}>{item?.userName}</p>
            ))}
          </div>
        )}
      </StyledUsersWrapper>
    </>
  );
};

export default Users;
