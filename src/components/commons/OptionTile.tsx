import React from 'react';
import { Pressable, View } from 'react-native';
import { Text } from './Text';
import { COLORS } from '@utils';
import { CenterView } from './Flex';
import { OptionTileProps } from './types';
import { useTheme } from '@hooks';

export const OptionTile = ({ styles, title, onPress, icon }: OptionTileProps) => {
  const { colors } = useTheme();
  return (
    <Pressable
      onPress={onPress}
      style={[
        {
          height: 50,
          flexDirection: 'row',
          borderBottomColor: colors.TEXT,
          alignItems: 'center',
          borderBottomWidth: 0.3,
          paddingHorizontal: 10,
        },
        styles,
      ]}
    >
      {icon && <CenterView style={{ width: 40, height: 40 }}>{icon}</CenterView>}
      <View style={{ flex: 1 }}>
        <Text isBold>{title}</Text>
      </View>
    </Pressable>
  );
};
