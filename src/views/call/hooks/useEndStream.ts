import fireDb from '@react-native-firebase/firestore';
import { FIRESTORE_COLLECTIONS } from '@utils';
import { onFindStreamById } from '@views/home/firebase';

export const useEndStream = (streamId: string) => {
  const onEndStream = async () => {
    const stream = await onFindStreamById(streamId);
    console.log('🚀 ~ onEndStream ~ stream:', stream);
    if (stream) {
      const dbRef = fireDb().collection(FIRESTORE_COLLECTIONS.STREAMS).doc(streamId);
      await dbRef.update({ endedAt: new Date().toString() });
    } else {
      console.log('sdkfmdknf');
    }
  };

  return { onEndStream };
};
