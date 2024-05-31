import usePostRequest from '@hooks/usePostRequest';
import { StreamAuth } from './type';
import axios from 'axios';
import { TOKEN_API } from '@utils';

const useGetStreamToken = () => {
  return usePostRequest<StreamAuth, { id: string; email: string }, null>({
    onPost: (payload) => {
      const fetch = async () => {
        const res = await axios<StreamAuth>({ method: 'post', url: TOKEN_API, data: payload });
        return res.data;
      };
      return fetch();
    },
  });
};

export default useGetStreamToken;
