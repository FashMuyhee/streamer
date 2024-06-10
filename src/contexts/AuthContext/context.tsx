import React from 'react';
import { IAuthContext, User } from './type';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import useGetStreamToken from './useGetStreamToken';
import fireDb from '@react-native-firebase/firestore';

const initialValue: IAuthContext = {
  isAuth: false,
  onLogout: () => {},
  streamToken: '',
  user: null,
  initializing: true,
  isLoggedIn: false,
};
export const AuthContext = React.createContext<IAuthContext>(initialValue);

const onGetUserInfo = async (uid: string) => {
  try {
    const user = await fireDb().collection('users').doc(uid).get();
    if (user) {
      return user as unknown as User;
    }
    throw null;
  } catch (error) {
    throw null;
  }
};

export default onGetUserInfo;

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [streamToken, setStreamToken] = React.useState('');
  const [user, setUser] = React.useState<User | null>(null);
  const [initializing, setInitializing] = React.useState(true);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);

  // API HOOKS
  const { post } = useGetStreamToken();

  const onLogout = async () => {
    await auth().signOut();
    setStreamToken('');
    setUser(null);
    setInitializing(false);
  };

  const onAuthStateChanged = async (user: FirebaseAuthTypes.User) => {
    setInitializing(true);
    if (user) {
      const {
        email,
        uid,
        metadata: { creationTime },
      } = user || {};
      if (user.uid) {
        setIsLoggedIn(true);
        const userInfo = await onGetUserInfo(uid);
        post({
          payload: { id: uid, email: String(email) },
          onSuccess: (res) => {
            setStreamToken(res.token);
          },
          onError: (err) => {
            setInitializing(false);
          },
        });
        setUser({
          uid,
          photoURL: userInfo?.photoURL ?? '',
          email,
          firstName: String(userInfo?.firstName),
          lastName: String(userInfo?.lastName),
          dateJoined: String(creationTime),
        });
      }

      setInitializing(false);
    } else {
      setInitializing(false);
    }
  };

  React.useEffect(() => {
    // @ts-ignore
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber;
  }, []);

  const value = React.useMemo(() => {
    const isAuth = !!user && isLoggedIn;
    return {
      isAuth,
      onLogout,
      streamToken,
      user,
      initializing,
      isLoggedIn,
    };
  }, [user, streamToken, initializing]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
