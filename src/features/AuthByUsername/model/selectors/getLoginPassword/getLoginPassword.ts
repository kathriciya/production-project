import { StateSchema } from 'app/providers/StoreProvider';

export const getLoginPassword = (state: StateSchema) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  state?.loginForm?.password || '';
