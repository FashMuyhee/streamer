import React from 'react';
import { ButtonProps } from './types';
import { Pressable, ActivityIndicator } from 'react-native';
import { Text } from './Text';
import { BORDER_RADIUS, COLORS } from '@utils';

export const Button: React.FunctionComponent<ButtonProps> = ({
  title,
  onPress,
  isLoading,
  disabled,
  style,
  bg = COLORS['light'].BLUE,
  textColor = COLORS['dark'].TEXT,
  fontSize = 16,
  height = 50,
}) => {
  const isDisabled = isLoading ? true : disabled;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      style={[
        {
          width: '100%',
          height,
          alignItems: 'center',
          justifyContent: 'center',
          borderRadius: BORDER_RADIUS,
          marginVertical: 10,
          backgroundColor: bg,
        },
        style,
      ]}
    >
      {isLoading ? (
        <ActivityIndicator color={textColor} size="small" />
      ) : (
        <Text isBold color={textColor} fontSize={fontSize} textAlign="center">
          {title}
        </Text>
      )}
    </Pressable>
  );
};
