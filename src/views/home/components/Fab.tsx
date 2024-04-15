import { StyleSheet, Animated, Easing } from 'react-native';
import React from 'react';
import { COLORS, IS_ANDROID, SCREEN_PADDING } from '@utils';
import { AddIcon, ArrowRightIcon, StreamIcon } from '@components';
import { IconButton } from '@components/commons/IconButton';

const C_SIZE = 50;
const E_SIZE = C_SIZE * 3 + 10;

type Props = {
  openJoin: () => void;
  openCreate: () => void;
};

export const Fab = ({ openJoin, openCreate }: Props) => {
  const scaleAnimate = React.useRef(new Animated.Value(C_SIZE)).current;
  const [isToggle, setIsToggle] = React.useState(false);

  const onToggleAnimation = React.useCallback(() => {
    const flipped = !isToggle;
    const toValue = flipped ? E_SIZE : C_SIZE;
    Animated.timing(scaleAnimate, {
      toValue,
      duration: 500,
      easing: Easing.ease,
      useNativeDriver: false,
    }).start(() => {
      setIsToggle(flipped);
    });
  }, [isToggle]);

  const animatedFab = {
    width: scaleAnimate,
  };

  const animatedActionList = {
    opacity: scaleAnimate.interpolate({
      inputRange: [C_SIZE, E_SIZE],
      outputRange: [0, 1],
    }),
  };

  return (
    <Animated.View style={[styles.fabContainer, animatedFab]}>
      <IconButton icon={isToggle ? <ArrowRightIcon /> : <StreamIcon />} onPress={onToggleAnimation} size={C_SIZE} />
      <Animated.View style={[styles.actionList, animatedActionList]}>
        <IconButton
          icon={<StreamIcon />}
          onPress={() => {
            onToggleAnimation();
            openJoin();
          }}
          size={C_SIZE}
        />
        <IconButton icon={<AddIcon />} onPress={openCreate} size={C_SIZE} />
      </Animated.View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  fabContainer: {
    position: 'absolute',
    bottom: IS_ANDROID ? 20 : 40,
    right: SCREEN_PADDING,
    alignSelf: 'flex-end',
    height: C_SIZE,
    borderRadius: C_SIZE / 2,
    backgroundColor: COLORS['dark'].BLUE,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  actionList: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
});
