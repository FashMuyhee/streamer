import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Text } from '@components';
import { BORDER_RADIUS, SHADOW_STYLE } from '@utils';
import { useTheme } from '@hooks';

type Props = {};

export const Description = (props: Props) => {
  const { colors } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: colors.SECONDARY }]}>
      <Text isBold>Health 101</Text>
      <Text>
        Live Q&A with Fitness Expert Sarah Jones! Get your fitness questions answered in real-time.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: BORDER_RADIUS,
    padding: 10,
    ...SHADOW_STYLE,
    minHeight: 100,
    rowGap: 4,
  },
});
