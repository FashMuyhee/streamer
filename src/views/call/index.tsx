import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScreenParams } from '@routes/type';
import { ScreenWrapper, Text } from '@components';
import { Call, useCallStateHooks, useStreamVideoClient } from '@stream-io/video-react-native-sdk';
import { CALL_ID } from '@utils';
import { Actions, Description, Participants } from './components';

type Props = {
  navigation: NativeStackNavigationProp<ScreenParams>;
};

export const CallScreen = ({ navigation }: Props) => {
  const [call, setCall] = React.useState<Call | null>(null);
  const client = useStreamVideoClient();
  const { useCallCustomData, useParticipants } = useCallStateHooks();

  // const joinCall = async () => {
  //   const call = client!.call('audio_room', CALL_ID);
  //   await call.join({
  //     create: true,
  //     data: {
  //       custom: {
  //         title: 'React Native test',
  //         description: 'We are doing a test of react native audio rooms',
  //       },
  //     },
  //   });
  //   setCall(call);
  // };

  // React.useEffect(() => {
  //   if (call || !client) return;
  //   joinCall();
  // }, []);

  // if (!call) {
  //   return (
  //     <ScreenWrapper>
  //       <Text>Joining call...</Text>
  //     </ScreenWrapper>
  //   );
  // }

  return (
    <ScreenWrapper noEdges>
      <Description />
      <Participants />
      <Actions />
    </ScreenWrapper>
  );
};
