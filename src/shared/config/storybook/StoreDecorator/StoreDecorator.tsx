import { Story } from '@storybook/react';

// TODO
import { StateSchema, StoreProvider } from '@/app/providers/StoreProvider';
// eslint-disable-next-line khyati-plugin/public-api-imports
import { articleDetailsReducer } from '@/entities/Article/model/slice/articleDetailsSlice';
// eslint-disable-next-line khyati-plugin/public-api-imports
import { loginReducer } from '@/features/AuthByUsername/model/slice/loginSlice';
// eslint-disable-next-line khyati-plugin/public-api-imports
import { addCommentFormReducer } from '@/features/addCommentForm/model/slices/addCommentFormSlice';
// eslint-disable-next-line khyati-plugin/public-api-imports
import { profileReducer } from '@/features/editableProfileCard/model/slice/profileSlice';
// eslint-disable-next-line khyati-plugin/public-api-imports
import { articleDetailsPageReducer } from '@/pages/ArticleDetailsPage/model/slices';
// eslint-disable-next-line khyati-plugin/public-api-imports
import { articlesPageReducer } from '@/pages/ArticlesPage/model/slices/articlesPageSlice';
import { ReducersList } from '@/shared/lib/components/DynamicModuleLoader/DynamicModuleLoader';

const defaultAsyncReducers: ReducersList = {
  loginForm: loginReducer,
  profile: profileReducer,
  articleDetails: articleDetailsReducer,
  addCommentForm: addCommentFormReducer,
  articlesPage: articlesPageReducer,
  articleDetailsPage: articleDetailsPageReducer,
};

export const StoreDecorator =
  (state: DeepPartial<StateSchema>, asyncReducers?: ReducersList) =>
  (StoryComponent: Story) =>
    (
      <StoreProvider
        initialState={state}
        asyncReducers={{ ...defaultAsyncReducers, ...asyncReducers }}
      >
        <StoryComponent />
      </StoreProvider>
    );
