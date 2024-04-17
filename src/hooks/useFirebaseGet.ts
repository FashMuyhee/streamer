import { useState, useEffect } from 'react';
import fireDb from '@react-native-firebase/database';

interface UseFirebaseDataProps<T> {
  ref?: string;
  // query?: (collectionRef: CollectionReference) => Query<DocumentData>;
}

export const useFirebaseGet = <T>({ ref }: UseFirebaseDataProps<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const refetch = async ({ ref: r }: UseFirebaseDataProps<T>) => {
    try {
      const db = fireDb().ref(r);
      const snapshot = await db.once('value');
      const data = snapshot.val();
      setData(data);
      return data as T;
    } catch (error) {
      setIsError(true);
    }
  };

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);

    const db = fireDb().ref(ref);
    const onDbChanged = db.on(
      'value',
      (snapshot) => {
        setIsLoading(false);
        setData(snapshot.val());
      },
      (e) => {
        console.log(e);
      }
    );

    return () => db.off('value', onDbChanged);
  }, [ref]);

  return { data, isLoading, isError, refetch };
};