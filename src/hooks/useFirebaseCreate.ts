import { useState } from 'react';
import fireDb, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

interface UseFirebaseCreateResponse<T> {
  isCreating: boolean;
  isError: boolean;
  onCreate: (ref: string, docId: string, payload: T, callbacks?: Callbacks) => void;
}
type Callbacks = {
  onSuccess?: () => void;
  onError?: (error: any) => void;
};

export const useFirebaseCreate = <T extends FirebaseFirestoreTypes.DocumentData>(): UseFirebaseCreateResponse<T> => {
  const [isCreating, setIsCreating] = useState(false);
  const [isError, setIsError] = useState(false);

  const onCreate = async (ref: string, docId: string, payload: T, callbacks?: Callbacks) => {
    setIsCreating(true);
    setIsError(false);

    try {
      const dbRef = fireDb().collection(ref).doc(docId);
      await dbRef.set(payload);

      if (callbacks?.onSuccess) {
        callbacks.onSuccess();
      }
    } catch (error) {
      setIsError(true);
      if (callbacks?.onError) {
        callbacks.onError(error);
      }
    } finally {
      setIsCreating(false);
    }
  };

  return { isCreating, isError, onCreate };
};
