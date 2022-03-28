import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usersEffects, usersSelectors } from 'store';
import { StyledUsersWrapper, StyledUsersTitle } from './styles';
import { RootStore } from 'store/interfaces';

const Users = () => {
  const dispatch = useDispatch();

  const usersData = useSelector((state: RootStore) =>
    usersSelectors.getUsersData(state),
  );

  const usersLoading = useSelector((state: RootStore) =>
    usersSelectors.getUsersLoading(state),
  );

  // useEffect(() => {
  //   dispatch(usersEffects.getUsersRequest());
  // }, []);

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
