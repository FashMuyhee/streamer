import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ProtectedScreenParams } from '@routes/type';
import { ScreenWrapper } from '@components';
import { SfuModels, StreamCall, useConnectedUser } from '@stream-io/video-react-native-sdk';
import { Actions, Description, Loader, Participants } from './components';
import { RouteProp } from '@react-navigation/native';
import { PermissionRequests, WaitingBanner } from './sheets';
import Toast from 'react-native-toast-message';
import { ScrollView } from 'react-native';
import { useStreamContext } from '@contexts';

type Props = {
  navigation: NativeStackNavigationProp<ProtectedScreenParams>;
  route: RouteProp<ProtectedScreenParams, 'call'>;
};

export const CallScreen = ({ navigation, route }: Props) => {
  const { host } = route.params;
  const [hasPermissionRequest, setHasPermissionsRequest] = React.useState(false);
  const [isWarningVisible, setIsWarningVisible] = React.useState(false);
  const connectedUser = useConnectedUser();

  const { stream: call } = useStreamContext();

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

  React.useEffect(() => {
    if (!call) {
      return;
    }
    return call.on('call.ended', (e) => {
      if (!host) {
        Toast.show({ text1: 'Host ended stream', type: 'info' });
      }
      navigation.goBack();
    });
  }, [call]);

  React.useEffect(() => {
    if (!call) {
      return;
    }
    return call.on('call.blocked_user', (e) => {
      const isMe = e?.user.id === connectedUser?.id;
      if (isMe) {
        Toast.show({ text1: 'Host kicked you out', type: 'info' });
        navigation.goBack();
      }
    });
  }, [call]);

  if (!call) {
    return <Loader loadingText={host ? 'Creating Live Stream' : 'Joining Stream'} />;
  }

  return (
    <StreamCall
      call={call}
      mediaDeviceInitialState={{
        initialAudioEnabled: false,
      }}
    >
      <ScreenWrapper noEdges>
        <ScrollView>
          <Description />
          <Participants />
        </ScrollView>
        <Actions isHost={call?.isCreatedByMe} openRequests={togglePermissionList} />
        <PermissionRequests isOpen={hasPermissionRequest} onClose={togglePermissionList} />
        <WaitingBanner onExitRoom={() => navigation.goBack()} isOpen={isWarningVisible} onClose={() => setIsWarningVisible(false)} />
      </ScreenWrapper>
    </StreamCall>
  );
};
