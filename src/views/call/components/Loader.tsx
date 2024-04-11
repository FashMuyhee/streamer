import { ActivityIndicator } from 'react-native';
import React from 'react';
import { Text, CenterView } from '@components';
import { useTheme } from '@hooks';
import { COLORS } from '@utils';

type Props = {
  loadingText: string;
};

export const Loader = ({ loadingText }: Props) => {
  const { theme, colors } = useTheme();
  return (
    <CenterView style={{ height: '100%', width: '100%', backgroundColor: colors.PRIMARY }}>
      <ActivityIndicator
        size="large"
        color={theme == 'light' ? COLORS['dark'].PRIMARY : COLORS['light'].PRIMARY}
      />
      <Text>{loadingText}</Text>
    </CenterView>
  );
};
