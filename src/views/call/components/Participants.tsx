import { StyleSheet, View, Pressable } from 'react-native';
import React from 'react';
import { MuteIcon, StackView, Text } from '@components';
import { BORDER_RADIUS, COLORS, SCREEN_PADDING } from '@utils';
import { useTheme } from '@hooks';
import {
  speaking,
  StreamVideoParticipant,
  useCallStateHooks,
  useConnectedUser,
} from '@stream-io/video-react-native-sdk';
import { UserAvatar } from '@components/commons/UserAvatar';
import { ParticipantActionSheet } from '../sheets';
import { isSpeaker } from '../hooks';

type Props = {};

type ParticipantProps = {
  participant: StreamVideoParticipant;
  isHost: boolean;
  onOpenAction: (p: StreamVideoParticipant) => void;
  canModerate: boolean;
};

export const Participants = (props: Props) => {
  const { colors } = useTheme();
  const { useParticipants, useCallCreatedBy } = useCallStateHooks();
  const participants = useParticipants({ sortBy: speaking });
  const hostUser = useCallCreatedBy();
  const loggedUser = useConnectedUser();
  const canModerate = loggedUser?.id == hostUser?.id;

  const isHost = (id: string) => hostUser?.id === id;
  const [participant, setParticipant] = React.useState<StreamVideoParticipant | null>(null);

  const onOpenAction = (p: StreamVideoParticipant) => {
    setParticipant(p);
  };

  return (
    <>
      <View style={[styles.container, { backgroundColor: colors.SECONDARY }]}>
        <Text isBold>Participants</Text>
        {/* users */}

        <StackView justify="flex-start" align="center" style={styles.participantList}>
          {participants.map((participant, index) => (
            <Participant
              key={index}
              participant={participant}
              isHost={isHost(participant.userId)}
              onOpenAction={onOpenAction}
              canModerate={canModerate}
            />
          ))}
        </StackView>
      </View>
      <ParticipantActionSheet
        user={participant as StreamVideoParticipant}
        isOpen={participant != null}
        onClose={() => setParticipant(null)}
      />
    </>
  );
};
const Participant = ({ participant, isHost, onOpenAction, canModerate }: ParticipantProps) => {
  const { colors } = useTheme();
  const canSpeak = isSpeaker(participant);
  return (
    <Pressable
      style={styles.participant}
      onPress={() => onOpenAction(participant)}
      disabled={isHost}
    >
      <UserAvatar
        user={{ id: participant.userId, image: participant.image, name: participant.name }}
        size="normal"
        onPress={() => {
          if (!isHost && canModerate) {
            onOpenAction(participant);
          }
        }}
      />
      {canSpeak && (
        <View style={styles.mic}>
          <MuteIcon color={colors.TEXT} />
        </View>
      )}
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
    paddingVertical: 10,
    paddingHorizontal: SCREEN_PADDING,
    minHeight: 180,
    rowGap: 4,
    marginTop: 20,
  },
  participantList: {
    marginTop: 10,
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
