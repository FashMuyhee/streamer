import React from 'react';
import { StackView, Text, UserAvatar } from '@components';
import { useAuth, usGetPartOfDay } from '@hooks';
import { View } from 'react-native';
import { NavigationProp, useNavigation } from '@react-navigation/native';
import { ProtectedScreenParams } from '@routes/type';

type Props = {};

export const Heading = (props: Props) => {
  const partDay = usGetPartOfDay();
  const { user } = useAuth();
  const navigation = useNavigation<NavigationProp<ProtectedScreenParams>>();

  return (
    <StackView style={{ marginTop: 10, marginBottom: 15 }} justify="space-between">
      <View>
        <Text textTransform="capitalize">Good {partDay}!</Text>
        <Text fontSize={18} isBold textTransform="capitalize">
          {user?.displayName}
        </Text>
      </View>
      <UserAvatar
        onPress={() => navigation.navigate('profile')}
        size={40}
        user={{ id: user?.uid as string, image: user?.photoURL as string, name: user?.displayName as string }}
      />
    </StackView>
  );
};
