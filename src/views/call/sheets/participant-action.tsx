import { View, Modal, Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { IS_ANDROID, SCREEN_HEIGHT, SCREEN_WIDTH } from '@utils';
import { useConfirmationAlert, useTheme } from '@hooks';
import { OptionTile, Text } from '@components';
import { OwnCapability, StreamVideoParticipant, useCall } from '@stream-io/video-react-native-sdk';
import { isSpeaker } from '../hooks';

type Props = {
  isOpen: boolean;
  onClose: () => void;
  user: StreamVideoParticipant;
};

export const ParticipantActionSheet = ({ isOpen, onClose, user }: Props) => {
  const { colors } = useTheme();
  const call = useCall();
  const alert = useConfirmationAlert();
  const toggleMicAlert = useConfirmationAlert();

  const canSpeak = isSpeaker(user);

  const onBlockUser = () => {
    onClose();
    alert.onShow({
      title: 'Block User',
      message: 'Are you sure you want to block this user?',
      onProceed: () => call?.blockUser(user.userId),
      proceedText: 'Block',
      closeText: 'Cancel',
    });
  };

  const toggleMic = async () => {
    if (canSpeak) {
      await call!.revokePermissions(user.userId, [OwnCapability.SEND_AUDIO]);
      return;
    }
    await call!.updateUserPermissions({
      user_id: user.userId,
      grant_permissions: [OwnCapability.SEND_AUDIO],
    });
  };

  const onToggleUserMic = () => {
    onClose();
    toggleMicAlert.onShow({
      title: !canSpeak ? 'Unmute' : 'Mute',
      message: !canSpeak ? `Unmute  ${user.name}` : `Mute ${user.name}`,
      onProceed: () => toggleMic(),
      proceedText: !canSpeak ? 'Unmute' : 'Mute',
      closeText: 'Cancel',
    });
  };

  return (
    <Modal
      visible={isOpen}
      onRequestClose={onClose}
      statusBarTranslucent
      transparent
      style={{ height: SCREEN_HEIGHT, width: SCREEN_WIDTH }}
      animationType="slide"
    >
      <View style={{ width: '100%', height: '100%', backgroundColor: 'rgba(18, 18, 18, 0.51)' }}>
        <Pressable style={{ width: '100%', height: '100%' }} onPress={onClose} />
        <View style={[styles.detachedContainer, { backgroundColor: colors.SECONDARY }]}>
          <Text isBold fontSize={17}>
            Actions
          </Text>
          <View>
            <OptionTile title={canSpeak ? 'Mute' : 'Unmute'} onPress={onToggleUserMic} />
            <OptionTile title="Block" onPress={onBlockUser} />
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  detachedContainer: {
    width: SCREEN_WIDTH * 0.95,
    alignSelf: 'center',
    bottom: IS_ANDROID ? 20 : 40,
    position: 'absolute',
    minHeight: 100,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
});
