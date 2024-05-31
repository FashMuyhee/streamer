import fireDb from '@react-native-firebase/database';
import { useAuth } from '@hooks';
import { useFindStreamById } from '@views/home/api';

export const useJoinCall = (streamId: string) => {
  const { user } = useAuth();
  const { findStream } = useFindStreamById();

  const onJoinCall = () => {
    findStream(streamId, async (d) => {
      const participants = d?.participants ?? [];
      const dbRef = fireDb().ref(`streams/${streamId}`);
      await dbRef.update({ participants: [...participants, user] });
    });
  };

  return { onJoinCall };
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
