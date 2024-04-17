import React from 'react';
import { ScreenWrapper, Text } from '@components';
import { useAuth, useTheme } from '@hooks';
import { StyleSheet } from 'react-native';
import { ProfileCard } from './components';

type Props = {};

export const ProfileScreen = (props: Props) => {
  const { user } = useAuth();
  const { colors } = useTheme();

  return (
    <ScreenWrapper noEdges>
      <ProfileCard />
    </ScreenWrapper>
  );
};

const styles = StyleSheet.create({
  logoutBtn: {
    width: '100%',
    height: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
