import { StyledUsersWrapper, StyledUsersTitle } from './styles';
import { RootReducerI, usersSelectors } from '@store';
import { useSelector } from 'react-redux';

const Users = () => {
  const usersData = useSelector((state: RootReducerI) =>
    usersSelectors.getUsersSelectors.getUsersData(state),
  );
  const usersLoading = useSelector((state: RootReducerI) =>
    usersSelectors.getUsersSelectors.getUsersLoading(state),
  );

  return (
    <>
      <StyledUsersWrapper>
        <StyledUsersTitle>List Of Names</StyledUsersTitle>
        {usersLoading === 'STATUS_LOADING' ? (
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
