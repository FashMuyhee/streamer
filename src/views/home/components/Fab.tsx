import { View, Text, Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { IS_ANDROID, SCREEN_WIDTH, SHADOW_STYLE } from '@utils';

type Props = {};
const SIZE = 60;
const HALF_SW = SCREEN_WIDTH / 2;
export const Fab = (props: Props) => {
  return <Pressable style={styles.fabContainer}></Pressable>;
};

const styles = StyleSheet.create({
  fabContainer: {
    position: 'absolute',
    bottom: IS_ANDROID ? 20 : 40,
    right: HALF_SW - SIZE / 2,
    left: HALF_SW - SIZE / 2,
    width: SIZE,
    height: SIZE,
    borderRadius: SIZE / 2,
    backgroundColor: 'red',
    alignItems: 'center',
    justifyContent: 'center',
    ...SHADOW_STYLE,
  },
});
