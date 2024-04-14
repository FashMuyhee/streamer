import React from 'react';
import { Button, PasswordTextInput, Text, TextInput } from '@components';
import { NavigationProp } from '@react-navigation/native';
import { AuthScreenParams } from '@routes/type';
import { AuthWrapper, GoogleButton } from '../component';
import { TextInput as RNTextInput } from 'react-native';
import { COLORS } from '@utils';

type Props = {
  navigation: NavigationProp<AuthScreenParams>;
};

export const LoginScreen = ({ navigation }: Props) => {
  const passwordInput = React.useRef<RNTextInput>(null);

  return (
    <AuthWrapper>
      <Text fontSize={24} isBold textAlign="center" style={{ marginTop: '5%' }}>
        Welcome back 😎
      </Text>
      <Text fontSize={14} textAlign="center" style={{ marginTop: 5, marginBottom: 30 }}>
        Hello there, login to continue
      </Text>
      <TextInput
        placeholder="Email"
        keyboardType="email-address"
        mb={20}
        returnKeyType="next"
        onSubmitEditing={() => passwordInput.current?.focus()}
      />
      <PasswordTextInput placeholder="Password" ref={passwordInput} />
      <Button title="Login" />
      <GoogleButton title="Continue with Google" />
      <Text onPress={() => navigation.navigate('register')} textAlign="center" style={{ marginTop: 20 }}>
        Don't have an account ? <Text color={COLORS['dark'].BLUE}>Register</Text>
      </Text>
    </AuthWrapper>
  );
};
