import { Call, useStreamVideoClient } from '@stream-io/video-react-native-sdk';
import React from 'react';

type Params = {
  id: string;
  title: string;
  description: string;
};

export const useCreateCall = ({ description, id, title }: Params) => {
  const [call, setCall] = React.useState<Call | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  const client = useStreamVideoClient();

  const joinCall = async () => {
    setIsLoading(true);
    const call = client!.call('audio_room', id);
    try {
      await call.join({
        create: true,
        data: {
          custom: { title, description },
        },
      });
      setCall(call);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (call || !client) return;
    joinCall();
  }, []);

  return { call, isLoading };
};
