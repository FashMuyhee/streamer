import { streamClient } from '@configs';
import { ConfirmationAlertContextProvider, ThemeContextProvider } from '@contexts';
import { RootNavigation } from '@routes';
import { StreamVideo } from '@stream-io/video-react-native-sdk';
import React from 'react';

export const App = () => {
  return (
    <ThemeContextProvider>
      <StreamVideo client={streamClient}>
        <ConfirmationAlertContextProvider>
          <RootNavigation />
        </ConfirmationAlertContextProvider>
      </StreamVideo>
    </ThemeContextProvider>
  );
};
