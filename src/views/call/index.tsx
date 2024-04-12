import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ScreenParams } from '@routes/type';
import { ScreenWrapper } from '@components';
import { SfuModels, StreamCall, useCallStateHooks } from '@stream-io/video-react-native-sdk';
import { CALL_ID } from '@utils';
import { Actions, Description, Loader, Participants } from './components';
import { useCreateCall } from './hooks';
import { RouteProp } from '@react-navigation/native';
import { PermissionRequests, WaitingBanner } from './sheets';

type Props = {
  navigation: NativeStackNavigationProp<ScreenParams>;
  route: RouteProp<ScreenParams, 'call'>;
};

export const CallScreen = ({ navigation, route }: Props) => {
  const { host } = route.params;
  const [hasPermissionRequest, setHasPermissionsRequest] = React.useState(false);
  const [isWarningVisible, setIsWarningVisible] = React.useState(false);

  const { call, isLoading } = useCreateCall({
    id: CALL_ID,
    title: 'React Native test',
    description: 'We are doing a test of react native audio rooms',
    host,
  });

  const togglePermissionList = () => {
    setHasPermissionsRequest(!hasPermissionRequest);
  };

  React.useEffect(() => {
    if (!call) {
      return;
    }
    return call.on('error', (e) => {
      if (e.error && e.error.code == SfuModels.ErrorCode.LIVE_ENDED) {
        setIsWarningVisible(true);
      }
    });
  }, [call]);

  if (isLoading || !call) {
    return <Loader loadingText={host ? 'Creating Live Stream' : 'Joining Stream'} />;
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
        <WaitingBanner
          onExitRoom={() => navigation.goBack()}
          isOpen={isWarningVisible}
          onClose={() => setIsWarningVisible(false)}
        />
      </StreamCall>
    </ScreenWrapper>
  );
};
