import { lazy } from 'react';

export const ProfilePageAsync = lazy(
  () =>
    new Promise((resolve) => {
      // @ts-ignore
      // Это временно!
      setTimeout(() => resolve(import('./ProfilePage')), 1500);
    })
);
