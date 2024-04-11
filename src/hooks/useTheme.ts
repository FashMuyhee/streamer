import React from 'react';
import { ThemeContext } from '@contexts';

export const useTheme = () => {
  const context = React.useContext(ThemeContext);
  return context;
};
