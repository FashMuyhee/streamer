import React from 'react';
import { ScreenWrapper, Text } from '@components';
import { useAuth, useTheme } from '@hooks';
import { Pressable, StyleSheet } from 'react-native';
import { ProfileCard } from './components';

type Props = {};

export const ProfileScreen = (props: Props) => {
  const { onLogout } = useAuth();
  const { colors } = useTheme();

  return (
    <ScreenWrapper noEdges>
      <ProfileCard />
      <Pressable style={styles.logoutBtn} onPress={onLogout}>
        <Text fontSize={20}>Logout</Text>
      </Pressable>
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
