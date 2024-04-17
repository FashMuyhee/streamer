import { Stream } from '@views/home/api';

export type ProtectedScreenParams = {
  home: undefined;
  room: undefined;
  call: { host: boolean; stream: Pick<Stream, 'description' | 'title' | 'id'> };
  profile: undefined;
};

export type AuthScreenParams = {
  onboarding: undefined;
  login: undefined;
  register: undefined;
};
