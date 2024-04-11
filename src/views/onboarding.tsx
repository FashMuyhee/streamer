import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScreenParams } from '@routes/type';
import { useTheme } from '@hooks';
import { Button, ScreenWrapper, Text } from '@components';

type Props = {
  navigation: NativeStackNavigationProp<ScreenParams>;
};

export const OnboardingScreen = ({ navigation }: Props) => {
  const { theme } = useTheme();

  return (
    <ScreenWrapper style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Button title="Continue to App" onPress={() => navigation.navigate('home')} />
    </ScreenWrapper>
  );
};
