import { Pressable } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeftIcon } from '@components';
import { useTheme } from '@hooks';

type Props = {
  onPress?: () => void;
};

export const BackArrow = ({ onPress }: Props) => {
  const navigation = useNavigation();
  const { colors } = useTheme();

  return (
    <Pressable
      onPress={() => {
        if (onPress) {
          onPress();
          return;
        }
        navigation.goBack();
      }}
    >
      <ArrowLeftIcon color={colors.TEXT} />
    </Pressable>
  );
};
