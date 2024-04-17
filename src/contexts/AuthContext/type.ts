import { FirebaseAuthTypes } from '@react-native-firebase/auth';

export interface IAuthContext {
  streamToken: string;
  user: User | null;
  isAuth: any;
  onLogout: () => void;
  initializing: boolean;
}

export interface User extends Pick<FirebaseAuthTypes.User, 'email' | 'uid' | 'photoURL' | 'displayName'> {
  firstName: string;
  lastName: string;
  dateJoined: string;
}
