import { View, Pressable } from 'react-native';
import React from 'react';
import { GoogleLogoIcon, Text } from '@components';
import { useTheme } from '@hooks';
import { BORDER_RADIUS } from '@utils';

type Props = {
  title: string;
  onPress: () => void;
};

export const GoogleButton = ({ onPress, title }: Props) => {
  const { colors } = useTheme();
  return (
    <Pressable
      style={{
        borderRadius: BORDER_RADIUS,
        paddingHorizontal: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 40,
        borderColor: colors.BLUE,
        borderWidth: 1,
        columnGap: 10,
        marginTop: 10,
      }}
    >
      <GoogleLogoIcon />
      <Text>{title}</Text>
    </Pressable>
  );
};
