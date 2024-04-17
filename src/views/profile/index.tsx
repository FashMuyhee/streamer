import React from 'react';
import { ScreenWrapper, Text } from '@components';
import { useAuth, useFirebaseGet, useTheme } from '@hooks';
import { Pressable, StyleSheet } from 'react-native';
import { ProfileCard } from './components';
import { User } from '@contexts';

type Props = {};

export const ProfileScreen = (props: Props) => {
  const { onLogout, user } = useAuth();
  const { colors } = useTheme();
  const { data, isLoading } = useFirebaseGet<User>({ ref: `users/${user?.uid}` });

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
