import React from 'react';
import { Button, PasswordTextInput, Text, TextInput } from '@components';
import { NavigationProp } from '@react-navigation/native';
import { AuthScreenParams } from '@routes/type';
import { AuthWrapper, GoogleButton } from '../component';
import { TextInput as RNTextInput } from 'react-native';
import { COLORS } from '@utils';
import { RegisterPayload, useRegister } from '../api';
import useForm from '@hooks/useForm';

type Props = {
  navigation: NavigationProp<AuthScreenParams>;
};

export const RegisterScreen = ({ navigation }: Props) => {
  const { isLoading, post } = useRegister();
  const lastNameInput = React.useRef<RNTextInput>(null);
  const emailInput = React.useRef<RNTextInput>(null);
  const passwordInput = React.useRef<RNTextInput>(null);

  const { values, handleSubmit, register, errors } = useForm<RegisterPayload>({
    defaultValues: { firstName: '', email: '', lastName: '', password: '' },
    validationRule: { email: 'email', firstName: 'string', lastName: 'string', password: 'string' },
  });

  const onSubmit = (v: RegisterPayload) => {
    post({
      payload: v,
    });
  };

  return (
    <AuthWrapper>
      <Text fontSize={24} isBold textAlign="center" style={{ marginTop: '5%' }}>
        Create Profile
      </Text>
      <Text fontSize={14} textAlign="center" style={{ marginTop: 5, marginBottom: 30 }}>
        Happy to have you onboard 🥳
      </Text>
      <TextInput
        value={values?.firstName}
        onChangeText={register('firstName').onChangeText}
        placeholder="First Name"
        mb={20}
        returnKeyType="next"
        onSubmitEditing={() => lastNameInput.current?.focus()}
        hintMessage={errors?.firstName as string}
        hasError={!!errors?.firstName}
      />
      <TextInput
        value={values?.lastName}
        onChangeText={register('lastName').onChangeText}
        placeholder="Last Name"
        mb={20}
        ref={lastNameInput}
        returnKeyType="next"
        onSubmitEditing={() => lastNameInput.current?.focus()}
        hintMessage={errors?.lastName as string}
        hasError={!!errors?.lastName}
      />
      <TextInput
        value={values?.email}
        onChangeText={register('email').onChangeText}
        placeholder="Email"
        keyboardType="email-address"
        mb={20}
        returnKeyType="next"
        ref={emailInput}
        onSubmitEditing={() => passwordInput.current?.focus()}
        hintMessage={errors?.email as string}
        hasError={!!errors?.email}
      />
      <PasswordTextInput
        value={values?.password}
        onChangeText={register('password').onChangeText}
        placeholder="Password"
        ref={passwordInput}
        returnKeyType="done"
        onSubmitEditing={() => handleSubmit(onSubmit)}
        hintMessage={errors?.password as string}
        hasError={!!errors?.password}
      />
      <Button title="Register" onPress={() => handleSubmit(onSubmit)} isLoading={isLoading} />
      <GoogleButton title="Continue with Google" onPress={() => {}} />
      <Text onPress={() => navigation.navigate('login')} textAlign="center" style={{ marginTop: 20 }}>
        Already have an account ? <Text color={COLORS['dark'].BLUE}>Login</Text>
      </Text>
    </AuthWrapper>
  );
};
