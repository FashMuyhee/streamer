import { useStreamContext } from '@contexts';
import { useStreamVideoClient } from '@stream-io/video-react-native-sdk';
import React from 'react';
import { Platform } from 'react-native';
import Toast from 'react-native-toast-message';

type Params = {
  id: string;
  title?: string;
  description?: string;
  host: boolean;
};

export const useCreateCall = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const client = useStreamVideoClient();
  const { onSaveStream } = useStreamContext();

  const joinCall = async ({ description, id, title, host }: Params) => {
    setIsLoading(true);
    const call = client!.call('audio_room', id);
    try {
      await call.join({
        create: host,
        data: {
          custom: { title, description },
        },
      });
      setIsLoading(false);
      console.log('🚀 ~ joinCall ~ call:' + Platform.OS, call.cid);
      onSaveStream(call);
      return call;
    } catch (error) {
      setIsLoading(false);
      Toast.show({
        text1: `Error while ${host ? 'creating' : 'joining'} stream, Try again`,
        type: 'error',
      });
      throw null;
    }
  };

  return { isLoading, onCreateJoin: joinCall };
};
