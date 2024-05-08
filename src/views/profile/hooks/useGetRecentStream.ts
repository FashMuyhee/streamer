import React from 'react';
import { useAuth } from '@hooks';
import { Stream } from '@views/home/api';
import fireDb from '@react-native-firebase/database';

export const useGetRecentStreams = () => {
  const { user } = useAuth();
  const id = user?.uid;
  const [isLoading, setIsLoading] = React.useState(false);
  const [allStreams, setAllStreams] = React.useState<Stream[]>([]);

  const onLoad = async () => {
    setIsLoading(true);
    let data: Stream[] = [];
    const db = fireDb().ref('streams');
    const snapshot = await db.once('value');
    // @ts-ignore
    snapshot.forEach((a) => {
      data.push(a.val());
    });
    const sortStream = data.filter((d) => d.createdBy.uid == id || d.participants.filter((p) => p.uid == id));
    setAllStreams(sortStream);
    setIsLoading(false);
  };

  React.useEffect(() => {
    onLoad();
  }, []);

  return { isLoading, recentStream: allStreams };
};
