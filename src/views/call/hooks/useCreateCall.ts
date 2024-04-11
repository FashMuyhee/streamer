import { Call, useStreamVideoClient } from '@stream-io/video-react-native-sdk';
import React from 'react';

type Params = {
  id: string;
  title: string;
  description: string;
  host: boolean;
};

export const useCreateCall = ({ description, id, title, host }: Params) => {
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
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    if (call || !client) return;
    joinCall();
  }, []);

  return { call, isLoading };
};
