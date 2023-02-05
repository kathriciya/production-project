import { lazy } from 'react';

export const MainPageAsync = lazy(
  () =>
    new Promise((resolve) => {
      //@ts-ignore
      //Это временно!
      setTimeout(() => resolve(import('./MainPage')), 1500);
    })
);
