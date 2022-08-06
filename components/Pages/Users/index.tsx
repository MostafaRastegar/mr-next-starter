import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { StyledUsersWrapper, StyledUsersTitle } from './styles';
import { usersEffects, RootReducerI, usersSelectors } from '@store';

const Users = () => {
  const dispatch = useDispatch();
  const usersData = useSelector((state: RootReducerI) =>
    usersSelectors.getUsersSelectors.getUsersData(state),
  );

  const usersLoading = useSelector((state: RootReducerI) =>
    usersSelectors.getUsersSelectors.getUsersLoading(state),
  );

  useEffect(() => {
    dispatch(usersEffects.getUsersRequest());
  }, []);

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
