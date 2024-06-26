import {
  OwnCapability,
  useCall,
  useCallStateHooks,
  useConnectedUser,
} from '@stream-io/video-react-native-sdk';
import React from 'react';
import Toast from 'react-native-toast-message';

export const useToggleMic = () => {
  const call = useCall();
  const { useMicrophoneState, useHasPermissions } = useCallStateHooks();
  const { isMute } = useMicrophoneState();

  const hasPermission = useHasPermissions(OwnCapability.SEND_AUDIO);
  const connectedUser = useConnectedUser();

  const [isAwaitingAudioApproval, setIsAwaitingAudioApproval] = React.useState(false);

  const onPress = async () => {
    if (!hasPermission) {
      setIsAwaitingAudioApproval(true);
      Toast.show({ text1: 'Request Sent, awaiting approval', type: 'info' });
      await call?.requestPermissions({
        permissions: [OwnCapability.SEND_AUDIO],
      });
      return;
    }
    call?.microphone.toggle();
  };

  React.useEffect(() => {
    if (!(call && connectedUser)) {
      return;
    }
    const unsubscribe = call.on('call.permissions_updated', (event) => {
      if (event.type !== 'call.permissions_updated') {
        return;
      }
      if (connectedUser.id !== event.user.id) {
        return;
      }
      setIsAwaitingAudioApproval(false);
      // automatically publish/unpublish audio stream based on the new permissions
      if (event.own_capabilities.includes(OwnCapability.SEND_AUDIO)) {
        Toast.show({ text1: 'Mic Opened', type: 'success' });
        call.microphone.enable();
      } else {
        call.microphone.disable();
        Toast.show({ text1: 'Muted', type: 'info' });
      }
    });

    return () => unsubscribe();
  }, [call, connectedUser]);

  return {
    disabled: isAwaitingAudioApproval,
    isMute,
    toggleMic: onPress,
  };
};
