import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScreenParams } from '@routes/type';
import { Button, ScreenWrapper, Text } from '@components';

type Props = {
  navigation: NativeStackNavigationProp<ScreenParams>;
};

export const HomeScreen = ({ navigation }: Props) => {
  return (
    <ScreenWrapper noEdges style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Text fontSize={35}>Welcome To Streamer</Text>
      <Button title="Join Stream" />
      <Text>Or </Text>
      <Button title="Create Stream" onPress={() => navigation.navigate('call')} />
    </ScreenWrapper>
  );
};
