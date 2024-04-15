import React from 'react';
import { StackView, Text, UserAvatar } from '@components';
import { usGetPartOfDay } from '@hooks';
import { View } from 'react-native';

type Props = {};

export const Heading = (props: Props) => {
  const partDay = usGetPartOfDay();
  return (
    <StackView style={{ marginTop: 10, marginBottom: 15 }} justify="space-between">
      <View>
        <Text textTransform="capitalize">Good {partDay}!</Text>
        <Text fontSize={18} isBold textTransform="capitalize">
          James Jean
        </Text>
      </View>
      <UserAvatar
        size={40}
        user={{ id: '', image: 'https://res.cloudinary.com/polarride/image/upload/v1712703068/polarride/b7jfnc5vkkttufrjod3q.jpg', name: '' }}
      />
    </StackView>
  );
};
