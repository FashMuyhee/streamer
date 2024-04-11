import {View, Text} from 'react-native';
import React from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ScreenParams} from '@routes/type';

type Props = {
  navigation: NativeStackNavigationProp<ScreenParams>;
};

export const OnboardingScreen = ({navigation}: Props) => {
  return (
    <View>
      <Text>Onboarding</Text>
    </View>
  );
};
