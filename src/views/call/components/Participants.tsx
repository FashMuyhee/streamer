import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Text } from '@components';
import { BORDER_RADIUS, SHADOW_STYLE } from '@utils';
import { useTheme } from '@hooks';

type Props = {};

export const Participants = (props: Props) => {
  const { colors } = useTheme();
  return <View style={[styles.container, { backgroundColor: colors.SECONDARY }]}></View>;
};

const styles = StyleSheet.create({
  container: {
    borderRadius: BORDER_RADIUS,
    padding: 10,
    ...SHADOW_STYLE,
    minHeight: 100,
    rowGap: 4,
    marginTop: 20,
  },
});
