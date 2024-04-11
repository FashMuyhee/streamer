import { streamClient } from '@configs';
import toastConfig from '@configs/toast';
import { ConfirmationAlertContextProvider, ThemeContextProvider } from '@contexts';
import { RootNavigation } from '@routes';
import { StreamVideo } from '@stream-io/video-react-native-sdk';
import React from 'react';
import Toast from 'react-native-toast-message';

export const App = () => {
  return (
    <ThemeContextProvider>
      <StreamVideo client={streamClient}>
        <ConfirmationAlertContextProvider>
          <RootNavigation />
          <Toast
            config={toastConfig}
            position="top"
            topOffset={-20}
            autoHide
            onPress={() => Toast.hide()}
            visibilityTime={3000}
          />
        </ConfirmationAlertContextProvider>
      </StreamVideo>
    </ThemeContextProvider>
  );
};
