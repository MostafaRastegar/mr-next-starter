import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { usersEffects, usersSelectors } from '@/app';
import { StyledUsersWrapper, StyledUsersTitle } from './styles';
import { Dispatch } from 'redux';

const Users = () => {
  const dispatch: Dispatch<any> = useDispatch();
  const usersResponse = useSelector(usersSelectors.getUsersResponse);

  useEffect(() => {
    dispatch(usersEffects.getUsersRequest());
  }, []);

  return (
    <>
      <StyledUsersWrapper>
        <StyledUsersTitle>List Of Names</StyledUsersTitle>
        {usersResponse.loading ? (
          <span>Loading ....</span>
        ) : (
          <div>
            {usersResponse.data?.map(
              (item: { id: number; userName: string }) => (
                <p key={item.id}>{item?.userName}</p>
              ),
            )}
          </div>
        )}
      </StyledUsersWrapper>
    </>
  );
};

export default Users;
