import { useAuth, useFirebaseCreate, useFirebaseGet } from '@hooks';
import { CreateStreamPayload, Stream } from './types';
import Toast from 'react-native-toast-message';
import { slugify, uid } from '@utils';
import React from 'react';
import fireDb from '@react-native-firebase/database';
import { useCreateCall } from '@views/call/hooks';

export const useCreateStream = () => {
  const { isCreating, onCreate } = useFirebaseCreate();
  const { isLoading, onCreateJoin } = useCreateCall();
  const { user } = useAuth();

  const onSave = (payload: CreateStreamPayload, onSuccess: (id: string) => void) => {
    const slug = slugify(payload.title);
    const id = uid();
    
    onCreateJoin({ ...payload, id, host: true }).then(() => {
      onCreate(
        `streams/${id}`,
        { slug, ...payload, id, createdBy: user, createdAt: new Date().toString(), endedAt: null, participants: [] },
        {
          onSuccess: () => {
            Toast.show({ text1: 'Stream Created', type: 'success' });
            onSuccess(id);
          },
          onError: () => {
            Toast.show({ text1: 'Error Creating Stream', type: 'error' });
          },
        }
      );
    });
  };
  return { isCreating: isCreating || isLoading, onSave };
};

export const useFindStreamById = () => {
  const { refetch, isLoading } = useFirebaseGet<Stream>({});

  const findStream = async (ref: string, onSuccess: (stream: Stream) => void) => {
    try {
      const data = await refetch({ ref: `streams/${ref}` });
      if (data) {
        Toast.show({ text1: 'Joining Stream', type: 'success' });
        onSuccess(data);
      } else {
        Toast.show({ text1: 'Stream not found', type: 'error' });
      }
    } catch (error) {
      Toast.show({ text1: 'Stream not found', type: 'error' });
    }
  };
  return { isLoading, findStream };
};

export const useGetCurrentStream = () => {
  const { user } = useAuth();
  const id = user?.uid;
  const [isLoading, setIsLoading] = React.useState(false);
  const [stream, setStream] = React.useState<Stream | undefined>(undefined);

  const onLoad = async () => {
    setIsLoading(true);
    let data: Stream[] = [];
    const db = fireDb().ref('streams');
    const snapshot = await db.once('value');
    snapshot.forEach((a) => {
      data.push(a.val());
      return true;
    });
    const sortStream = data.find((d) => d?.endedAt == null && (d.createdBy.uid == id || d.participants.find((u) => u.uid == id)));
    setStream(sortStream);
    setIsLoading(false);
  };

  React.useEffect(() => {
    onLoad();
  }, []);

  return { isLoading, stream, onLoad };
};

export const useGetStreams = () => {
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
    setAllStreams(data);
    setIsLoading(false);
  };

  React.useEffect(() => {
    onLoad();
  }, []);

  return { isLoading, streams: allStreams, onLoad };
};
