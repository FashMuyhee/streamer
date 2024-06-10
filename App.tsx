import toastConfig from '@configs/toast';
import { AuthProvider, ConfirmationAlertContextProvider, StreamContextProvider, ThemeContextProvider } from '@contexts';
import { RootNavigation } from '@routes';
import { IS_ANDROID } from '@utils';
import React from 'react';
import Toast from 'react-native-toast-message';

export const App = () => {
  return (
    <AuthProvider>
      <ThemeContextProvider>
        <StreamContextProvider>
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
        </StreamContextProvider>
      </ThemeContextProvider>
    </AuthProvider>
  );
};
