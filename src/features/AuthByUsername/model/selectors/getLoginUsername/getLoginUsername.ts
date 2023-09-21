import { StateSchema } from '@/app/providers/StoreProvider';

export const getLoginUsername = (state: StateSchema) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  state?.loginForm?.username || '';
