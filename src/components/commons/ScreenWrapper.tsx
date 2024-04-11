import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ScreenWrapperProps } from './types';
import { useTheme } from '@hooks';
import { SCREEN_PADDING } from '@utils';

export const ScreenWrapper = ({ children, bg, padding = SCREEN_PADDING }: ScreenWrapperProps) => {
  const { colors } = useTheme();
  bg = bg ? bg : colors.PRIMARY;

  return <SafeAreaView style={{ backgroundColor: bg, padding, flex: 1 }}>{children}</SafeAreaView>;
};
