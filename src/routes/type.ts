import { Call } from '@stream-io/video-react-native-sdk';
import { Stream } from '@views/home/api';

export type ProtectedScreenParams = {
  home: undefined;
  room: undefined;
  call: { host?: boolean; stream?: Pick<Stream, 'description' | 'title' | 'id'>; mode: 'new' | 'load' };
  profile: undefined;
};

export type AuthScreenParams = {
  onboarding: undefined;
  login: undefined;
  register: undefined;
};
