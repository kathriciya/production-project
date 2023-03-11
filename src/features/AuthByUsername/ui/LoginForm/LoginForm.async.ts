import { FC, lazy } from 'react';
import { LoginFormProps } from './LoginForm';

export const LoginFormAsync = lazy<FC<LoginFormProps>>(
  () =>
    // eslint-disable-next-line implicit-arrow-linebreak
    new Promise((resolve) => {
      // @ts-ignore
      // Это временно!
      setTimeout(() => resolve(import('./LoginForm.tsx')), 1500);
    }),
);
