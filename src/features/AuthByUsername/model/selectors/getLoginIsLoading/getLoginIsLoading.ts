import { StateSchema } from '@/app/providers/StoreProvider';

export const getLoginIsLoading = (state: StateSchema) =>
  // eslint-disable-next-line implicit-arrow-linebreak
  state?.loginForm?.isLoading || false;
