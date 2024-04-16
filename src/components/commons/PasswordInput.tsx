import React from 'react';
import { TextInput } from './TextInput';
import { TextInput as RNInput } from 'react-native';
import { TextInputProps } from './types';
import { Text } from './Text';
import { COLORS } from '@utils';

export const PasswordTextInput = React.forwardRef<RNInput, TextInputProps>(({ placeholder = 'Password', returnKeyType = 'done', ...rest }, ref) => {
  const [passwordVisible, setPasswordVisible] = React.useState(false);

  const toggleVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };

  const Icon = () => {
    return (
      <Text color={COLORS.dark.BLUE} onPress={toggleVisibility}>
        {!passwordVisible ? 'SHOW' : 'HIDE'}
      </Text>
    );
  };

  return <TextInput {...rest} ref={ref} returnKeyType={returnKeyType} secureText={!passwordVisible} placeholder={placeholder} rightIcon={<Icon />} />;
});
