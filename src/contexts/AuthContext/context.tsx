import React from 'react';
import { IAuthContext, User } from './type';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';

const initialValue: IAuthContext = {
  isAuth: false,
  onLogout: () => {},
  streamToken: '',
  user: null,
  initializing: true,
};
export const AuthContext = React.createContext<IAuthContext>(initialValue);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [loggedInUser, setLoggedInUser] = React.useState(false);
  const [streamToken, setStreamToken] = React.useState('');
  const [user, setUser] = React.useState<User | null>(null);
  const [initializing, setInitializing] = React.useState(true);

  const onLogout = async () => {
    await auth().signOut();
    setLoggedInUser(false);
    setStreamToken('');
    setUser(null);
  };

  const onAuthStateChanged = (user: FirebaseAuthTypes.User) => {
    if (user) {
      setUser({ ...user, firstName: '', lastName: '' });
      setInitializing(false);
    }
  };

  React.useEffect(() => {
    // @ts-ignore
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  const value = React.useMemo(() => {
    const isAuth = loggedInUser && streamToken;
    return {
      isAuth,
      onLogout,
      streamToken,
      user,
      initializing,
    };
  }, [loggedInUser, streamToken]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
