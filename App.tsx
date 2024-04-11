import { ThemeContextProvider } from '@contexts';
import { RootNavigation } from '@routes';
import React from 'react';

export const App = () => {
  return (
    <ThemeContextProvider>
      <RootNavigation />
    </ThemeContextProvider>
  );
};
