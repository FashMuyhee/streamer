import React from 'react';
import { ScreenWrapper } from '@components';
import { KeyboardAvoidingView, ScrollView, View } from 'react-native';
import { COLORS, IS_ANDROID } from '@utils';

type Props = {
  children: React.ReactNode;
};

export const AuthWrapper = ({ children }: Props) => {
  return (
    <ScreenWrapper>
      {/* <ScrollView keyboardDismissMode="interactive" keyboardShouldPersistTaps="handled"> */}
      <KeyboardAvoidingView behavior={IS_ANDROID ? 'padding' : 'height'} style={{ flex: 1 }}>
        <View
          style={{
            alignSelf: 'center',
            width: 100,
            height: 100,
            borderRadius: 25,
            backgroundColor: COLORS.dark.GREEN,
            marginTop: '25%',
            marginBottom: 10,
          }}
        />
        {children}
      </KeyboardAvoidingView>
      {/* </ScrollView> */}
    </ScreenWrapper>
  );
};
