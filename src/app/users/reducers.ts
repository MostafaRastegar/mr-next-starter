import { AnyAction } from 'redux';
import { reducerMaker, initialState } from '@/helpers/reduxHelpers';
import { InitialTemplateI } from '@/app/interfaces';

type DataI = { id: number; userName: string; password: string }[];

export type UsersReducersType = InitialTemplateI<DataI>;

const users = (state = initialState, action: AnyAction) =>
  reducerMaker(state, action);

export default users;
