import React from 'react';
import { Button, PasswordTextInput, Text, TextInput } from '@components';
import { NavigationProp } from '@react-navigation/native';
import { AuthScreenParams } from '@routes/type';
import { AuthWrapper } from '../component';
import { TextInput as RNTextInput } from 'react-native';

type Props = {
  navigation: NavigationProp<AuthScreenParams>;
};

export const RegisterScreen = (props: Props) => {
  const lastNameInput = React.useRef<RNTextInput>(null);
  const emailInput = React.useRef<RNTextInput>(null);
  const passwordInput = React.useRef<RNTextInput>(null);

  return (
    <AuthWrapper>
      <Text fontSize={24} isBold textAlign="center" style={{ marginTop: '5%' }}>
        Create Profile
      </Text>
      <Text fontSize={14} textAlign="center" style={{ marginTop: 5, marginBottom: 30 }}>
        Happy to have you onboard 🥳
      </Text>
      <TextInput placeholder="First Name" mb={20} returnKeyType="next" onSubmitEditing={() => lastNameInput.current?.focus()} />
      <TextInput placeholder="Last Name" mb={20} ref={lastNameInput} returnKeyType="next" onSubmitEditing={() => lastNameInput.current?.focus()} />
      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        mb={20}
        returnKeyType="next"
        ref={emailInput}
        onSubmitEditing={() => passwordInput.current?.focus()}
      />
      <PasswordTextInput placeholder="Password" ref={passwordInput} returnKeyType="done" onSubmitEditing={() => passwordInput.current?.focus()} />
      <Button title="Login" />
    </AuthWrapper>
  );
};
