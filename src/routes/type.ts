import { Call } from '@stream-io/video-react-native-sdk';
import { Stream } from '@views/home/firebase';

export type ProtectedScreenParams = {
  home: undefined;
  room: undefined;
  call: { host?: boolean };
  profile: undefined;
};

export type AuthScreenParams = {
  onboarding: undefined;
  login: undefined;
  register: undefined;
};
