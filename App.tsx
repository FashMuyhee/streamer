import { streamClient } from '@configs';
import toastConfig from '@configs/toast';
import { AuthProvider, ConfirmationAlertContextProvider, ThemeContextProvider } from '@contexts';
import { RootNavigation } from '@routes';
import { StreamVideo } from '@stream-io/video-react-native-sdk';
import { IS_ANDROID } from '@utils';
import React from 'react';
import Toast from 'react-native-toast-message';

export const App = () => {
  return (
    <AuthProvider>
      <ThemeContextProvider>
        {/* <StreamVideo client={streamClient}> */}
        <ConfirmationAlertContextProvider>
          <RootNavigation />
          <Toast
            config={toastConfig}
            position={IS_ANDROID ? 'bottom' : 'top'}
            autoHide
            onPress={() => Toast.hide()}
            visibilityTime={3000}
            topOffset={IS_ANDROID ? undefined : -20}
            bottomOffset={IS_ANDROID ? 0 : undefined}
          />
        </ConfirmationAlertContextProvider>
        {/* </StreamVideo> */}
      </ThemeContextProvider>
    </AuthProvider>
  );
};
