import { StreamVideoClient } from '@stream-io/video-react-native-sdk';
import { API_KEY, TOKEN, USER_ID } from '@utils';
const user = {
  id: USER_ID,
  name: 'Mattie James',
  image:
    'https://res.cloudinary.com/polarride/image/upload/v1712703068/polarride/b7jfnc5vkkttufrjod3q.jpg',
};

export const streamClient = new StreamVideoClient({ apiKey: API_KEY, user, token: TOKEN });
