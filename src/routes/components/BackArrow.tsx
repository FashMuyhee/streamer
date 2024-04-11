import {Pressable} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {ArrowLeftIcon} from '@components';

type Props = {
  onPress?: () => void;
};

export const BackArrow = ({onPress}: Props) => {
  const navigation = useNavigation();
  return (
    <Pressable
      onPress={() => {
        if (onPress) {
          onPress();
          return;
        }
        navigation.goBack();
      }}>
      <ArrowLeftIcon />
    </Pressable>
  );
};
