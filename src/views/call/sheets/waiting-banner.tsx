import { View, Modal, StyleSheet } from 'react-native';
import React from 'react';
import { SCREEN_HEIGHT, SCREEN_WIDTH } from '@utils';
import { useTheme } from '@hooks';
import { Button, StackView, Text } from '@components';
import { useCall, useCallStateHooks } from '@stream-io/video-react-native-sdk';

type Props = {
  onExitRoom: () => void;
  isOpen: boolean;
  onClose: () => void;
};

export const WaitingBanner = ({ onExitRoom, isOpen, onClose }: Props) => {
  const { colors, theme } = useTheme();
  const call = useCall();
  const { useIsCallLive, useCallCustomData, useCallCreatedBy } = useCallStateHooks();
  const hostUser = useCallCreatedBy();
  const isLive = useIsCallLive();
  const customData = useCallCustomData();
  const isHost = call?.currentUserId == hostUser?.id;

  const onJoin = () => {
    if (isLive) {
      call?.join();
      onClose();
    }
  };

  const onLeave = () => {
    onExitRoom();
    call?.leave();
  };

  return (
    <Modal
      visible={!isHost && isOpen}
      statusBarTranslucent
      transparent
      style={{ height: SCREEN_HEIGHT, width: SCREEN_WIDTH }}
      animationType="slide"
    >
      <View
        style={{
          width: '100%',
          height: '100%',
          backgroundColor: theme == 'light' ? 'rgba(200,200,200, .8)' : 'rgba(0,0,0,0.9)',
        }}
      >
        <View
          style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}
        >
          <View style={[styles.content, { backgroundColor: colors.SECONDARY }]}>
            <Text
              textAlign="center"
              style={[{ marginTop: 15, marginHorizontal: 20, marginBottom: 10 }]}
            >
              {isLive
                ? `${customData.title} is now streaming live`
                : 'Waiting for host to publish stream live'}
            </Text>
            <StackView
              justify="center"
              align="center"
              style={{
                position: 'absolute',
                bottom: 5,
                width: '100%',
                columnGap: 10,
              }}
            >
              <Button
                title="Leave Stream"
                fontSize={13}
                onPress={onLeave}
                style={{ width: '45%', height: 40, borderRadius: 10 }}
                bg={colors.RED}
              />
              {isLive && (
                <Button
                  title="Join Stream"
                  fontSize={13}
                  onPress={onJoin}
                  style={{ width: '45%', height: 40, borderRadius: 10 }}
                  bg={colors.GREEN}
                />
              )}
            </StackView>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  content: {
    height: 120,
    width: '85%',
    borderRadius: 5,
    alignItems: 'center',
    paddingHorizontal: 5,
  },
});
