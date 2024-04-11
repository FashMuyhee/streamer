import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScreenParams } from '@routes/type';
import { useTheme } from '@hooks';
import { ScreenWrapper, Text } from '@components';

type Props = {
  navigation: NativeStackNavigationProp<ScreenParams>;
};

export const OnboardingScreen = ({ navigation }: Props) => {
  const { theme } = useTheme();

  return (
    <ScreenWrapper>
      <Text fontSize={30}>Whereas disregard and contempt for human rights have resulted</Text>
    </ScreenWrapper>
  );
};
