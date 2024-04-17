import { useAuth, useFirebaseCreate, useFirebaseGet } from '@hooks';
import { CreateStreamPayload, Stream } from './types';
import Toast from 'react-native-toast-message';
import { slugify, uid } from '@utils';

export const useCreateStream = () => {
  const { isCreating, onCreate } = useFirebaseCreate();
  const { user } = useAuth();

  const onSave = (payload: CreateStreamPayload, onSuccess: (id: string) => void) => {
    const slug = slugify(payload.title);
    const id = uid();
    onCreate(
      `streams/${id}`,
      { slug, ...payload, id, createdBy: user, createdAt: new Date().toString() },
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
  };
  return { isCreating, onSave };
};

export const useFindStreamById = () => {
  const { refetch, isLoading } = useFirebaseGet<Stream>({});

  const findStream = async (ref: string, onSuccess: (stream: Stream) => void) => {
    try {
      const data = await refetch({ ref: `streams/${ref}` });
      if (data) {
        Toast.show({ text1: 'Joining Stream', type: 'error' });
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
