import { StyleSheet, Animated, Easing, View } from 'react-native';
import React from 'react';
import { COLORS, IS_ANDROID, SCREEN_PADDING, SHADOW_STYLE } from '@utils';
import { AddIcon, ArrowRightIcon, StreamIcon } from '@components';
import { IconButton } from '@components/commons/IconButton';

const SIZE = 50;

type Props = {};

export const Fab = (props: Props) => {
  const scaleAnimate = React.useRef(new Animated.Value(SIZE)).current;
  const [isToggle, setIsToggle] = React.useState(false);

  const onToggleAnimation = React.useCallback(() => {
    const flipped = !isToggle;
    const toValue = flipped ? SIZE * 3 + 10 : SIZE;
    Animated.timing(scaleAnimate, {
      toValue,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start(() => {
      setIsToggle(flipped);
    });
  }, [isToggle]);

  const animationStyle = {
    width: scaleAnimate,
  };

  return (
    <Animated.View style={[styles.fabContainer, animationStyle]}>
      <IconButton icon={isToggle ? <ArrowRightIcon /> : <StreamIcon />} onPress={onToggleAnimation} size={SIZE} />
      <View style={{ alignItems: 'center', justifyContent: 'space-between', flexDirection: 'row' }}>
        <IconButton icon={<StreamIcon />} onPress={() => {}} size={SIZE} />
        <IconButton icon={<AddIcon />} onPress={() => {}} size={SIZE} />
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  fabContainer: {
    position: 'absolute',
    bottom: IS_ANDROID ? 20 : 40,
    right: SCREEN_PADDING,
    alignSelf: 'flex-end',
    height: SIZE,
    borderRadius: SIZE / 2,
    backgroundColor: COLORS['dark'].BLUE,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
