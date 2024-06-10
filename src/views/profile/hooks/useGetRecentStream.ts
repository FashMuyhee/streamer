import React from 'react';
import { useAuth } from '@hooks';
import { Stream, useGetStreams } from '@views/home/firebase';

export const useGetRecentStreams = () => {
  const { user } = useAuth();
  const id = user?.uid;
  const [isLoading, setIsLoading] = React.useState(false);
  const [allStreams, setAllStreams] = React.useState<Stream[]>([]);

  const { streams } = useGetStreams();

  const onLoad = async () => {
    setIsLoading(true);
    if (streams) {
      const sortStream = streams.filter((d) => d.createdBy.uid == id || d.participants.filter((p) => p.uid == id));
      setAllStreams(sortStream);
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    onLoad();
  }, []);

  return { isLoading, recentStream: allStreams };
};
