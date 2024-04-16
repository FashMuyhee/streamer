import React from 'react';
import { useTheme } from '@hooks';
import { ScreenWrapper, StackView, Text } from '@components';
import { ActivityIndicator, View } from 'react-native';
import { IS_ANDROID, SCREEN_WIDTH } from '@utils';

export const Loader = () => {
  const { colors } = useTheme();

  return (
    <ScreenWrapper style={{ alignItems: 'center', justifyContent: 'center', paddingBottom: IS_ANDROID ? 30 : 60 }}>
      <View
        style={{
          width: SCREEN_WIDTH * 0.5,
          height: SCREEN_WIDTH * 0.5,
          backgroundColor: colors.GREEN,
          borderRadius: 20,
          marginTop: '15%',
          marginBottom: '10%',
        }}
      />
      <StackView align="center" style={{ columnGap: 10 }}>
        <ActivityIndicator size="large" color={colors.TEXT} />
        <Text textAlign="center" fontSize={20} textTransform="capitalize">
          Loading ....
        </Text>
      </StackView>
    </ScreenWrapper>
  );
};
