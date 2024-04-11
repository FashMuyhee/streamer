import {
  OwnCapability,
  PermissionRequestEvent,
  useCall,
  useCallStateHooks,
} from '@stream-io/video-react-native-sdk';
import React from 'react';

export const useSpeakRequest = () => {
  const call = useCall();
  const { useHasPermissions } = useCallStateHooks();
  const canUpdatePermissions = useHasPermissions(OwnCapability.UPDATE_CALL_PERMISSIONS);
  const [speakingRequests, setSpeakingRequests] = React.useState<PermissionRequestEvent[]>([]);

  React.useEffect(() => {
    if (!(call && canUpdatePermissions)) {
      return;
    }
    return call.on('call.permission_request', (event) => {
      if (event.type !== 'call.permission_request') {
        return;
      }
      setSpeakingRequests((prevSpeakingRequests) => [...prevSpeakingRequests, event]);
    });
  }, [call, canUpdatePermissions]);

  return { speakingRequests, setSpeakingRequests };
};
