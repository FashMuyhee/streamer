import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScreenParams } from '@routes/type';
import { ScreenWrapper, Text } from '@components';
import { StreamCall, useCallStateHooks } from '@stream-io/video-react-native-sdk';
import { CALL_ID } from '@utils';
import { Actions, Description, Participants } from './components';
import { useCreateCall } from './hooks';
import { RouteProp } from '@react-navigation/native';

type Props = {
  navigation: NativeStackNavigationProp<ScreenParams>;
  route: RouteProp<ScreenParams, 'call'>;
};

export const CallScreen = ({ navigation, route }: Props) => {
  const { host } = route.params;

  const { call, isLoading } = useCreateCall({
    id: CALL_ID,
    title: 'React Native test',
    description: 'We are doing a test of react native audio rooms',
    host,
  });

  if (isLoading || !call) {
    return (
      <ScreenWrapper>
        <Text>Joining call...</Text>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper noEdges>
      <StreamCall call={call}>
        <Description />
        <Participants />
        <Actions isHost={call?.isCreatedByMe} />
      </StreamCall>
    </ScreenWrapper>
  );
};
