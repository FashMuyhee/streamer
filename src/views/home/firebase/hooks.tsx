import { useAuth, useFirebaseCreate } from '@hooks';
import { CreateStreamPayload, Stream } from './types';
import Toast from 'react-native-toast-message';
import { FIRESTORE_COLLECTIONS, slugify, uid } from '@utils';
import React from 'react';
import fireDb, { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';
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
        FIRESTORE_COLLECTIONS.STREAMS,
        id,
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

export const useJoinStream = () => {
  const { user } = useAuth();
  const { isLoading, onCreateJoin } = useCreateCall();

  const onJoinStream = async (streamId: string, onSuccess: () => void) => {
    const stream = await onFindStreamById(streamId);
    if (stream) {
      const participants = stream?.participants ?? [];
      const dbRef = fireDb().collection(FIRESTORE_COLLECTIONS.STREAMS).doc(streamId);
      onCreateJoin({ id: streamId, host: false })
        .then(async () => {
          await dbRef.update({ participants: [...participants, user] });
          onSuccess();
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  return { isLoading, onJoinStream };
};

export const onFindStreamById = async (id: string) => {
  try {
    const stream = await fireDb().collection<Stream>(FIRESTORE_COLLECTIONS.STREAMS).doc(id).get();
    if (stream.exists) {
      return stream.data() as Stream;
    }
  } catch (error) {
    throw null;
  }
};

export const useGetCurrentStream = () => {
  const { user } = useAuth();
  const id = user?.uid;
  const [isLoading, setIsLoading] = React.useState(false);
  const [stream, setStream] = React.useState<Stream | undefined>(undefined);
  const { streams } = useGetStreams();

  const onLoad = async () => {
    if (streams) {
      const sortStream = streams.find((d) => d?.endedAt == null && (d.createdBy.uid == id || d.participants.find((u) => u.uid == id)));
      setStream(sortStream);
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    onLoad();
  }, [streams]);

  return { isLoading, stream, onLoad };
};

export const useGetStreams = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [allStreams, setAllStreams] = React.useState<Stream[]>([]);

  const streamSetter = (doc: FirebaseFirestoreTypes.QuerySnapshot<Stream>) => {
    setIsLoading(false);
    if (doc.empty) {
      setAllStreams([]);
      return;
    }
    const data = doc.docs.map((d) => {
      return d.data();
    });

    setAllStreams(data);
  };

  React.useEffect(() => {
    const firestoreSubscriber = fireDb().collection<Stream>(FIRESTORE_COLLECTIONS.STREAMS).onSnapshot(streamSetter);
    return () => firestoreSubscriber();
  }, []);

  return { isLoading, streams: allStreams };
};
