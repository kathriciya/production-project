import type {
  ReduxStoreWithManager,
  StateSchema,
  ThunkConfig,
  ThunkExtraArg,
} from './config/StateSchema';
import { AppDispatch, createReduxStore } from './config/store';
import { StoreProvider } from './ui/StoreProvider';

export {
  StoreProvider,
  createReduxStore,
  StateSchema,
  ReduxStoreWithManager,
  AppDispatch,
  ThunkConfig,
  ThunkExtraArg,
};
