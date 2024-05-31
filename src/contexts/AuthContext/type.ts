import { FirebaseAuthTypes } from '@react-native-firebase/auth';

export interface IAuthContext {
  streamToken: string;
  user: User | null;
  isAuth: any;
  onLogout: () => void;
  initializing: boolean;
  isLoggedIn: boolean;
}

export interface User extends Pick<FirebaseAuthTypes.User, 'email' | 'uid' | 'photoURL'> {
  firstName: string;
  lastName: string;
  dateJoined: string;
}

export interface StreamAuth {
  token: string;
}
