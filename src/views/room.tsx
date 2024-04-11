import {View, Text} from 'react-native';
import React from 'react';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';
import {ScreenParams} from '@routes/type';

type Props = {
  navigation: NativeStackNavigationProp<ScreenParams>;
};

export const RoomScreen = ({navigation}: Props) => {
  return (
    <View>
      <Text>home</Text>
    </View>
  );
};
