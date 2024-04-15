import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ProtectedScreenParams } from '@routes/type';
import { ScreenWrapper, Text } from '@components';
import { Categories, CurrentStream, Fab, FeatureStreams, Heading } from './components';
import { ScrollView } from 'react-native';

type Props = {
  navigation: NativeStackNavigationProp<ProtectedScreenParams>;
};

export const HomeScreen = ({ navigation }: Props) => {
  return (
    <ScreenWrapper>
      <Heading />
      <ScrollView showsVerticalScrollIndicator={false}>
        <CurrentStream />
        <Categories />
        <FeatureStreams />
      </ScrollView>
      <Fab />
    </ScreenWrapper>
  );
};
