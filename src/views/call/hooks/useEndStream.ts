import fireDb from '@react-native-firebase/firestore';
import { onFindStreamById } from '@views/home/api';

export const useEndStream = (streamId: string) => {
  const onEndStream = async () => {
    const stream = await onFindStreamById(streamId);
    if (stream) {
      const dbRef = fireDb().collection(`streams`).doc(streamId);
      await dbRef.update({ endedAt: new Date().toString() });
    }
  };

  return { onEndStream };
};
