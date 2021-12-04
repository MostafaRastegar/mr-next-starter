import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usersEffects, usersSelectors } from 'store';
import { StyledUsersWrapper, StyledUsersTitle } from './styles';
import { RootStore } from 'store/interfaces';

const Users = () => {
  const dispatch = useDispatch();
  const allUsersData = useSelector((state: RootStore) =>
    usersSelectors.getAllUsersData(state),
  );
  const allUsersLoading = useSelector((state: RootStore) =>
    usersSelectors.getAllUsersLoading(state),
  );
  useEffect(() => {
    dispatch(usersEffects.getAllUsersRequest());
  }, []);
  return (
    <>
      <StyledUsersWrapper>
        <StyledUsersTitle>List Of Names</StyledUsersTitle>
        {allUsersLoading ? (
          <span>Loading ....</span>
        ) : (
          <div>
            {allUsersData?.map((item) => (
              <p key={item.id}>{item?.userName}</p>
            ))}
          </div>
        )}
      </StyledUsersWrapper>
    </>
  );
};

export default Users;
