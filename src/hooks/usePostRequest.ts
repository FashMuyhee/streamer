import { useState } from 'react';

export interface PostRequest<T = any, P = any, E = any> {
  data?: T | null;
  isLoading: boolean;
  isError: boolean;
  error: E | null;
  post: (p: PostParams<P, T, E>) => Promise<void>;
}
interface PostParams<P, T, E> {
  payload: P;
  onSuccess?: (res: T) => void;
  onError?: (e: E) => void;
}

export interface PostRequestParams<T = any, P = any, E = any> {
  onPost: (payload: P) => Promise<T>;
  onSuccess?: (res: T) => void;
  onError?: (e: E) => void;
}

export default function usePostRequest<T, K, E>({
  onPost,
  onError: paramError,
  onSuccess: paramSuccess,
}: PostRequestParams<T, K, E>): PostRequest<T, K, E> {
  const [data, setData] = useState<T | undefined | null>();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<E | null>(null);

  const post = async ({ payload, onError, onSuccess }: PostParams<K, T, E>) => {
    setIsLoading(true);
    setError(null);

    try {
      const res = await onPost(payload);
      setData(res);
      if (onSuccess) {
        onSuccess(res);
      }
      if (paramSuccess) {
        paramSuccess(res);
      }
    } catch (error) {
      const err = error as E;
      setError(err);
      if (onError) {
        onError(err);
      }
      if (paramError) {
        paramError(err);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return { data, isLoading, isError: error != null, error, post };
}
