import { StreamVideoClient, StreamVideoRN } from '@stream-io/video-react-native-sdk';
import { AndroidImportance } from '@notifee/react-native';
import { API_KEY, IS_ANDROID, TOKEN, USER_ID } from '@utils';

StreamVideoRN.updateConfig({
  foregroundService: {
    android: {
      channel: {
        id: 'stream_call_foreground_service',
        name: 'Service to keep call alive',
        lights: false,
        vibration: false,
        importance: AndroidImportance.DEFAULT,
      },
      notificationTexts: {
        title: 'Video call is in progress',
        body: 'Tap to return to the call',
      },
    },
  },
});

const TOKEN_1 = TOKEN;
const TOKEN_2 =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiUmV2YW4iLCJpc3MiOiJodHRwczovL3Byb250by5nZXRzdHJlYW0uaW8iLCJzdWIiOiJ1c2VyL1JldmFuIiwiaWF0IjoxNzEyODM1MjQxLCJleHAiOjE3MTM0NDAwNDZ9.lL4qs5SamuDcDSfiRBSDhzROeWWexr5_rnd-2rlO7_8';

const user_1 = {
  id: USER_ID,
  name: 'Mattie James',
  image:
    'https://res.cloudinary.com/polarride/image/upload/v1712703068/polarride/b7jfnc5vkkttufrjod3q.jpg',
};

const user_2 = {
  id: 'Revan',
  name: 'Revan Revan',
  image: '',
};

export const streamClient = new StreamVideoClient({
  apiKey: API_KEY,
  user: IS_ANDROID ? user_1 : user_2,
  token: IS_ANDROID ? TOKEN_1 : TOKEN_2,
});
