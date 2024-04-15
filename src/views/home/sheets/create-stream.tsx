import { View, StyleSheet, Animated } from 'react-native';
import React from 'react';
import { BORDER_RADIUS, COLORS, IS_ANDROID, SCREEN_HEIGHT, SCREEN_PADDING, SCREEN_WIDTH } from '@utils';
import { useTheme } from '@hooks';
import { Button, CancelIcon, StackView, Text, TextInput } from '@components';
import { IconButton } from '@components/commons/IconButton';

type Props = {
  isVisible: boolean;
  onClose: () => void;
};

export const CreateStream = ({ isVisible, onClose }: Props) => {
  const { colors } = useTheme();
  const translateY = React.useRef(new Animated.Value(0)).current;

  const toggleAnimation = () => {
    Animated.spring(translateY, {
      toValue: -20,
      useNativeDriver: true,
      bounciness: 10,
    }).start();
  };

  const onCloseSheet = () => {
    onClose();
    translateY.setValue(0);
  };

  const animatedStyle = {
    transform: [{ translateY }],
  };

  React.useEffect(() => {
    if (isVisible) {
      toggleAnimation();
    }
  }, [isVisible]);

  if (!isVisible) return null;

  return (
    <View style={styles.sheet}>
      <Animated.View style={[styles.wrapper, animatedStyle, { backgroundColor: colors.SECONDARY }]}>
        <StackView style={{ marginTop: 15, marginBottom: 30 }} align="center" justify="space-between">
          <Text isBold fontSize={20}>
            Create new stream
          </Text>
          <IconButton
            size={30}
            style={{ backgroundColor: colors.PRIMARY }}
            icon={<CancelIcon color={colors.TEXT} iconSize={15} />}
            onPress={onCloseSheet}
          />
        </StackView>
        <TextInput placeholder="Title" mb={10} />
        <TextInput placeholder="Description" mb={10} maxLength={150} multiline />
        <Button title="Create" />
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    height: 330,
    borderRadius: BORDER_RADIUS,
    width: SCREEN_WIDTH - 30,
    bottom: IS_ANDROID ? 60 : 80,
    position: 'absolute',
    alignSelf: 'center',
    paddingHorizontal: SCREEN_PADDING,
    zIndex: 1,
  },
  sheet: {
    height: SCREEN_HEIGHT,
    position: 'absolute',
    width: SCREEN_WIDTH,
    backgroundColor: `${COLORS['light'].TEXT}90`,
  },
});
