import React, { createContext, useMemo } from 'react';
import { IThemeContext, Theme } from './type';
import { useColorScheme } from 'react-native';
import { COLORS } from '@utils';

const initialState: IThemeContext = {
  onChangeTheme: () => {},
  theme: 'light',
  colors: COLORS['light'],
};

export const ThemeContext = createContext<IThemeContext>(initialState);

export const ThemeContextProvider = ({ children }: { children: React.ReactNode }) => {
  const systemTheme = useColorScheme();
  const [userTheme, setUserTheme] = React.useState<Theme>('dark');

  const colors = React.useMemo(() => {
    return COLORS[userTheme];
  }, [userTheme]);

  const onChangeTheme = (theme: Theme) => {
    setUserTheme(theme);
  };

  const value = useMemo(() => {
    return {
      theme: userTheme,
      onChangeTheme,
      colors,
    };
  }, []);

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
};
