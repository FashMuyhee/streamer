import React from 'react';
import { IAuthContext, User } from './type';
import auth, { FirebaseAuthTypes } from '@react-native-firebase/auth';
import useGetStreamToken from './useGetStreamToken';
import fireDb from '@react-native-firebase/firestore';
import { FIRESTORE_COLLECTIONS } from '@utils';
import { useAsyncStorage } from '@react-native-async-storage/async-storage';
import { jwtDecode } from 'jwt-decode';
//@ts-ignore
import { decode } from 'base-64';
global.atob = decode;

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
    const user = await fireDb().collection(FIRESTORE_COLLECTIONS.USERS).doc(uid).get();
    if (user) {
      return user.data() as unknown as User;
    }
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
  const { getItem, setItem } = useAsyncStorage('@GET_STREAM_TOKEN');

  // API HOOKS
  const { post } = useGetStreamToken();

  const onLogout = async () => {
    await auth().signOut();
    setStreamToken('');
    setUser(null);
    setInitializing(false);
  };

  const tokenIsValid = async () => {
    const token = await getItem();
    if (token) {
      try {
        const decoded = jwtDecode(token);
        const currentTime = Math.floor(Date.now() / 1000);
        return Number(decoded.exp) > currentTime;
      } catch (error) {
        return false;
      }
    }
    return false;
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
        const isTokenValid = await tokenIsValid();
        if (!isTokenValid) {
          post({
            payload: { id: uid, email: String(email) },
            onSuccess: (res) => {
              setStreamToken(res.token);
              setItem(res.token);
            },
            onError: (err) => {
              setInitializing(false);
            },
          });
        } else {
          const token = await getItem();
          setStreamToken(token as string);
        }
        setUser({
          uid,
          photoURL: userInfo?.photoURL ?? '',
          email,
          firstName: String(userInfo?.firstName),
          lastName: String(userInfo?.lastName),
          dateJoined: String(creationTime),
        });
        setInitializing(false);
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
