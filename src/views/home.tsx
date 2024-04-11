import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScreenParams } from '@routes/type';
import { ScreenWrapper, Text } from '@components';

type Props = {
  navigation: NativeStackNavigationProp<ScreenParams>;
};

export const HomeScreen = ({ navigation }: Props) => {
  return (
    <ScreenWrapper noEdges>
      <Text>home</Text>
    </ScreenWrapper>
  );
};
