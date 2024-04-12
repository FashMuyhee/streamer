import { useNavigation } from '@react-navigation/native';
import { Call, useStreamVideoClient } from '@stream-io/video-react-native-sdk';
import React from 'react';
import Toast from 'react-native-toast-message';

type Params = {
  id: string;
  title: string;
  description: string;
  host: boolean;
};

export const useCreateCall = ({ description, id, title, host }: Params) => {
  const navigation = useNavigation();
  const [call, setCall] = React.useState<Call | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  const client = useStreamVideoClient();

  const joinCall = async () => {
    setIsLoading(true);
    const call = client!.call('audio_room', id);
    try {
      await call.join({
        create: host,
        data: {
          custom: { title, description },
        },
      });
      setCall(call);
      setIsLoading(false);
    } catch (error) {
      Toast.show({
        text1: `Error while ${host ? 'creating' : 'joining'} stream, Try again`,
        type: 'error',
      });
      setIsLoading(false);
      navigation.goBack();
    }
  };

  React.useEffect(() => {
    if (call || !client) return;
    joinCall();
  }, []);

  return { call, isLoading };
};
