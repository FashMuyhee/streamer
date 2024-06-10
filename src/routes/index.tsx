import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { ProtectedStack } from './protected';
import { AuthStack } from './auth';
import { useAuth } from '@hooks';
import { Loader } from '@views';
import { StreamVideo, StreamVideoClient } from '@stream-io/video-react-native-sdk';
import { API_KEY } from '@utils';

export const RootNavigation = () => {
  const { isAuth, initializing, streamToken, user } = useAuth();
  const [client, setClient] = React.useState<StreamVideoClient | null>(null);

  React.useEffect(() => {
    if (initializing) return;
    client?.disconnectUser();
  }, [initializing, isAuth]);

  React.useEffect(() => {
    if (isAuth && streamToken && user) {
      const streamClient = new StreamVideoClient({
        apiKey: API_KEY,
        user: {
          id: user?.uid,
          image: user?.photoURL ?? '',
          name: `${user?.firstName} ${user?.lastName}`,
          type: 'authenticated',
        },
        token: streamToken,
      });
      setClient(streamClient);
    } else {
      setClient(null);
    }
  }, [streamToken, user, isAuth]);

  const Layout = () => {
    if (client && isAuth) {
      return (
        <StreamVideo client={client as StreamVideoClient}>
          <ProtectedStack />
        </StreamVideo>
      );
    }

    if (isAuth && !client) {
      return <Loader />;
    }

    return <AuthStack />;
  };

  if (initializing && !streamToken) {
    return <Loader />;
  }

  return (
    <NavigationContainer>
      <Layout />
    </NavigationContainer>
  );
};
