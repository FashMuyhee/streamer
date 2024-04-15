import React from 'react';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { ProtectedScreenParams } from '@routes/type';
import { ScreenWrapper } from '@components';
import { Categories, CurrentStream, Fab, FeatureStreams, Heading } from './components';
import { ScrollView } from 'react-native';
import { CreateStream, JoinStream } from './sheets';

type Props = {
  navigation: NativeStackNavigationProp<ProtectedScreenParams>;
};

export const HomeScreen = ({ navigation }: Props) => {
  const [isShowJoinSheet, setIsShowJoinSheet] = React.useState(false);
  const [isShowCreateSheet, setIsShowCreateSheet] = React.useState(false);

  return (
    <ScreenWrapper>
      <Heading />
      <ScrollView showsVerticalScrollIndicator={false}>
        <CurrentStream />
        <Categories />
        <FeatureStreams />
      </ScrollView>
      <Fab openJoin={() => setIsShowJoinSheet(!isShowJoinSheet)} openCreate={() => setIsShowCreateSheet(!isShowCreateSheet)} />
      <JoinStream isVisible={isShowJoinSheet} onClose={() => setIsShowJoinSheet(!isShowJoinSheet)} />
      <CreateStream isVisible={isShowCreateSheet} onClose={() => setIsShowCreateSheet(!isShowCreateSheet)} />
    </ScreenWrapper>
  );
};
