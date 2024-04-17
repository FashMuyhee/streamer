import { View } from 'react-native';
import React from 'react';
import { useAuth, useTheme } from '@hooks';
import { BORDER_RADIUS, dateFormatter } from '@utils';
import { StackView, Text, UserAvatar } from '@components';

export const ProfileCard = () => {
  const { colors } = useTheme();
  const { user } = useAuth();

  const displayName = `${user?.firstName} ${user?.lastName}`;

  return (
    <StackView
      align="center"
      style={{
        columnGap: 15,
        paddingHorizontal: 10,
        backgroundColor: colors.SECONDARY,
        width: '100%',
        height: 130,
        borderRadius: BORDER_RADIUS,
        marginTop: 20,
      }}
    >
      <UserAvatar user={{ id: String(user?.uid), image: user?.photoURL ?? '', name: displayName }} size={90} />
      <View style={{ width: '65%', rowGap: 2 }}>
        <Text style={{ width: '90%' }} fontSize={20} isBold truncate>
          {displayName}
        </Text>
        <Text fontSize={16}>{user?.email}</Text>
        <Text fontSize={14}>Joined on {dateFormatter(user?.dateJoined as string)}</Text>
      </View>
    </StackView>
  );
};
