import { PERMISSION } from '@constants';

export type IStateType = {
  token: string;
  adminToken: string;
  appToken: string;
  apiBaseUrl: string;
  collapsed: boolean;
  permissions: PERMISSION[];
  project: {
    id: string;
    name: string;
  } | null;
};

export type IStateActionsType = {
  set: (state: Partial<IStateType>) => void;
  reset: (state?: Partial<IStateType>) => void;
};

export type IGlobalStateType = IStateType & {
  actions: IStateActionsType;
};
