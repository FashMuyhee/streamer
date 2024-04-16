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
  const [streamToken, setStreamToken] = React.useState('');
  const [user, setUser] = React.useState<User | null>(null);
  const [initializing, setInitializing] = React.useState(true);

  const onLogout = async () => {
    await auth().signOut();
    setStreamToken('');
    setUser(null);
  };

  const onAuthStateChanged = (user: FirebaseAuthTypes.User) => {
    if (user) {
      // TODO:STREAM API
      // TODO: RETRIEVE USER FROM DB
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
    const isAuth = !!user && streamToken;
    return {
      isAuth,
      onLogout,
      streamToken,
      user,
      initializing,
    };
  }, [user, streamToken]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
