import React from 'react';
import { Button, PasswordTextInput, Text, TextInput } from '@components';
import { NavigationProp } from '@react-navigation/native';
import { AuthScreenParams } from '@routes/type';
import { AuthWrapper, GoogleButton } from '../component';
import { TextInput as RNTextInput } from 'react-native';
import { COLORS } from '@utils';
import useForm from '@hooks/useForm';
import { LoginPayload, useLogin } from '../api';

type Props = {
  navigation: NavigationProp<AuthScreenParams>;
};

export const LoginScreen = ({ navigation }: Props) => {
  const passwordInput = React.useRef<RNTextInput>(null);

  const { post, isLoading } = useLogin();
  const { values, handleSubmit, register, errors } = useForm<LoginPayload>({
    defaultValues: { email: '', password: '' },
    validationRule: { email: 'email', password: 'string' },
  });

  const onSubmit = (v: LoginPayload) => {
    post({
      payload: v,
    });
  };

  return (
    <AuthWrapper>
      <Text fontSize={24} isBold textAlign="center" style={{ marginTop: '5%' }}>
        Welcome back 😎
      </Text>
      <Text fontSize={14} textAlign="center" style={{ marginTop: 5, marginBottom: 30 }}>
        Hello there, login to continue
      </Text>
      <TextInput
        value={values?.email}
        onChangeText={register('email').onChangeText}
        hasError={!!errors?.email}
        hintMessage={errors?.email as string}
        placeholder="Email"
        keyboardType="email-address"
        mb={20}
        returnKeyType="next"
        onSubmitEditing={() => passwordInput.current?.focus()}
      />
      <PasswordTextInput
        value={values?.password}
        onChangeText={register('password').onChangeText}
        hasError={!!errors?.password}
        hintMessage={errors?.password as string}
        placeholder="Password"
        ref={passwordInput}
        onSubmitEditing={() => handleSubmit(onSubmit)}
      />
      <Button title="Login" isLoading={isLoading} onPress={() => handleSubmit(onSubmit)} />
      <GoogleButton title="Continue with Google" onPress={() => {}} />
      <Text onPress={() => navigation.navigate('register')} textAlign="center" style={{ marginTop: 20 }}>
        Don't have an account ? <Text color={COLORS['dark'].BLUE}>Register</Text>
      </Text>
    </AuthWrapper>
  );
};
