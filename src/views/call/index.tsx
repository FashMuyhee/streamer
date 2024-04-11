import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScreenParams } from '@routes/type';
import { ScreenWrapper, Text } from '@components';
import { StreamCall, useCallStateHooks } from '@stream-io/video-react-native-sdk';
import { CALL_ID } from '@utils';
import { Actions, Description, Participants } from './components';
import { useCreateCall } from './hooks';
import { RouteProp } from '@react-navigation/native';
import { useConfirmationAlert } from '@hooks';
import { Alert } from 'react-native';
import { PermissionRequests } from './sheets/pemission-requests';

type Props = {
  navigation: NativeStackNavigationProp<ScreenParams>;
  route: RouteProp<ScreenParams, 'call'>;
};

export const CallScreen = ({ navigation, route }: Props) => {
  const { host } = route.params;
  const [hasPermissionRequest, setHasPermissionsRequest] = React.useState(false);
  const endLiveAlert = useConfirmationAlert();

  const { call, isLoading } = useCreateCall({
    id: CALL_ID,
    title: 'React Native test',
    description: 'We are doing a test of react native audio rooms',
    host,
  });

  const togglePermissionList = () => {
    setHasPermissionsRequest(!hasPermissionRequest);
  };
  // React.useEffect(() => {
  //   if (isEnded) {
  //     Alert.alert('Stream Ended', 'This stream has been ended by the host', [
  //       { text: 'Ok', onPress: () => navigation.goBack(), style: 'default' },
  //     ]);
  //   }
  // }, [isEnded]);

  if (isLoading || !call) {
    return (
      <ScreenWrapper>
        <Text>Joining call...</Text>
      </ScreenWrapper>
    );
  }

  return (
    <ScreenWrapper noEdges>
      <StreamCall
        call={call}
        mediaDeviceInitialState={{
          initialAudioEnabled: false,
        }}
      >
        <Description />
        <Participants />
        <Actions isHost={call?.isCreatedByMe} openRequests={togglePermissionList} />
        <PermissionRequests isOpen={hasPermissionRequest} onClose={togglePermissionList} />
      </StreamCall>
    </ScreenWrapper>
  );
};
