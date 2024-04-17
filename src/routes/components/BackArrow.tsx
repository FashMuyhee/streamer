import { Pressable } from 'react-native';
import React from 'react';
import { useNavigation } from '@react-navigation/native';
import { ArrowLeftIcon, ChevronLeftIcon } from '@components';
import { useTheme } from '@hooks';
import { IS_ANDROID } from '@utils';

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
      {IS_ANDROID ? <ArrowLeftIcon color={colors.TEXT} /> : <ChevronLeftIcon color={colors.TEXT} />}
    </Pressable>
  );
};
