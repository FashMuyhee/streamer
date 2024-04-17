import { useState } from 'react';
import fireDb from '@react-native-firebase/database';

interface UseFirebaseCreateResponse<T> {
  isCreating: boolean;
  isError: boolean;
  onCreate: (ref: string, payload: T, callbacks: Callbacks) => void;
}
type Callbacks = {
  onSuccess?: () => void;
  onError?: (error: any) => void;
};

export const useFirebaseCreate = <T>(): UseFirebaseCreateResponse<T> => {
  const [isCreating, setIsCreating] = useState(false);
  const [isError, setIsError] = useState(false);

  const onCreate = async (ref: string, payload: T, callbacks: Callbacks) => {
    setIsCreating(true);
    setIsError(false);

    try {
      const dbRef = fireDb().ref(ref);
      const newRef = await dbRef.set(payload);

      if (callbacks.onSuccess) {
        callbacks.onSuccess();
      }
    } catch (error) {
      setIsError(true);
      if (callbacks.onError) {
        callbacks.onError(error);
      }
    } finally {
      setIsCreating(false);
    }
  };

  return { isCreating, isError, onCreate };
};
