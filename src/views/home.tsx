import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScreenParams } from '@routes/type';
import { Button, ScreenWrapper, Text } from '@components';
import notifee from '@notifee/react-native';

type Props = {
  navigation: NativeStackNavigationProp<ScreenParams>;
};

export const HomeScreen = ({ navigation }: Props) => {
  async function requestUserPermission() {
    const settings = await notifee.requestPermission();
  }

  React.useEffect(() => {
    requestUserPermission();
  }, []);

  return (
    <ScreenWrapper noEdges style={{ alignItems: 'center', justifyContent: 'center' }}>
      <Text fontSize={35} textAlign="center">
        Welcome To Streamer
      </Text>
      <Button title="Join Stream" onPress={() => navigation.navigate('call', { host: false })} />
      <Text>Or </Text>
      <Button title="Create Stream" onPress={() => navigation.navigate('call', { host: true })} />
    </ScreenWrapper>
  );
};
