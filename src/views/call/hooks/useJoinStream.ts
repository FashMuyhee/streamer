import fireDb from '@react-native-firebase/database';
import { useAuth } from '@hooks';
import { useFindStreamById } from '@views/home/api';
import { useCreateCall } from './useCreateCall';

export const useJoinStream = () => {
  const { user } = useAuth();
  const { isLoading: fetchingStream, findStream } = useFindStreamById();
  const { isLoading, onCreateJoin } = useCreateCall();

  const onJoinStream = (streamId: string, onSuccess: () => void) => {
    findStream(streamId, async (d) => {
      const participants = d?.participants ?? [];
      const dbRef = fireDb().ref(`streams/${streamId}`);
      onCreateJoin({ id: streamId, host: false })
        .then(async (call) => {
          console.log('🚀 ~ useJoinCall ~ call:', call.id);
          await dbRef.update({ participants: [...participants, user] });
          onSuccess();
        })
        .catch((e) => {
          console.log(e);
        });
    });
  };

  return { isLoading: isLoading || fetchingStream, onJoinStream };
};

export const useEndStream = (streamId: string) => {
  const { findStream } = useFindStreamById();

  const onEndStream = () => {
    findStream(streamId, async (d) => {
      const dbRef = fireDb().ref(`streams/${streamId}`);
      await dbRef.update({ endedAt: new Date().toString() });
    });
  };

  return { onEndStream };
};
