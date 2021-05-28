import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usersEffects, usersSelectors } from 'store';
import { StyledUsersWrapper, StyledUsersTitle } from './styles';

const Users = () => {
  const dispatch = useDispatch();
  const allUsersData = useSelector((state) =>
    usersSelectors.getAllUsersData(state),
  );
  const allUsersLoading = useSelector((state) =>
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
