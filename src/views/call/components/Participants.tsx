import { StyleSheet, View, Pressable } from 'react-native';
import React from 'react';
import { MuteIcon, StackView, Text } from '@components';
import { BORDER_RADIUS, COLORS } from '@utils';
import { useConfirmationAlert, useTheme } from '@hooks';
import {
  OwnCapability,
  speaking,
  StreamVideoParticipant,
  useCall,
  useCallStateHooks,
} from '@stream-io/video-react-native-sdk';
import { UserAvatar } from '@components/commons/UserAvatar';

type Props = {};

type ParticipantProps = {
  participant: StreamVideoParticipant;
  isHost: boolean;
};

export const Participants = (props: Props) => {
  const { colors } = useTheme();
  const { useParticipants, useCallCreatedBy } = useCallStateHooks();
  const participants = useParticipants({ sortBy: speaking });
  const hostUser = useCallCreatedBy();
  const isHost = (id: string) => hostUser?.id === id;

  return (
    <View style={[styles.container, { backgroundColor: colors.SECONDARY }]}>
      <Text isBold>Participants</Text>
      {/* users */}
      <StackView justify="flex-start" align="center" style={styles.participantList}>
        {participants.map((participant, index) => (
          <Participant key={index} participant={participant} isHost={isHost(participant.userId)} />
        ))}
      </StackView>
    </View>
  );
};
const Participant = ({ participant, isHost }: ParticipantProps) => {
  const { colors } = useTheme();

  const toggleMicAlert = useConfirmationAlert();
  const call = useCall();
  const { useHasPermissions } = useCallStateHooks();
  const canUpdatePermissions = useHasPermissions(OwnCapability.UPDATE_CALL_PERMISSIONS);
  const isMute = true;

  const toggleMic = async (id: string) => {
    await call!.updateUserPermissions({
      user_id: id,
      grant_permissions: [OwnCapability.SEND_AUDIO],
    });
  };

  const onToggleUserMic = () => {
    if (canUpdatePermissions) {
      toggleMicAlert.onShow({
        title: isMute ? 'Unmute User' : 'Mute User',
        message: isMute
          ? `Give ${participant.name} speaking capability`
          : `Mute ${participant.name}`,
        onProceed: () => toggleMic(participant.userId),
        proceedText: isMute ? 'Unmute' : 'Mute',
        closeText: 'Cancel',
      });
    }
  };

  return (
    <Pressable style={styles.participant} onPress={onToggleUserMic} disabled={isHost}>
      <UserAvatar
        user={{ id: participant.userId, image: participant.image, name: participant.name }}
        size="normal"
        onPress={() => (isHost ? undefined : onToggleUserMic())}
      />
      <View style={styles.mic}>
        <MuteIcon color={colors.TEXT} />
      </View>
      <StackView align="center" style={{ columnGap: 3, marginTop: 5 }}>
        <Text fontSize={13} textAlign="center">
          {participant.name} {isHost ? '(Host)' : ''}
        </Text>
        {participant.isSpeaking && <View style={styles.speakingBadge} />}
      </StackView>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: BORDER_RADIUS,
    padding: 10,
    minHeight: 140,
    rowGap: 4,
    marginTop: 20,
  },
  participantList: {
    marginTop: 5,
    columnGap: 5,
    flexWrap: 'wrap',
    rowGap: 10,
    alignContent: 'flex-start',
  },
  participantAvatar: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 60,
    height: 60,
    borderRadius: 30,
    rowGap: 3,
    backgroundColor: COLORS['dark'].BLUE,
  },
  participant: {
    height: 100,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '30%',
  },
  speakingBadge: {
    backgroundColor: COLORS['dark'].RED,
    width: 5,
    height: 5,
    borderRadius: 5,
  },
  mic: {
    position: 'absolute',
    bottom: 40,
    right: 20,
  },
});
