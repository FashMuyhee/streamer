import { StyleSheet, View } from 'react-native';
import React from 'react';
import { StackView, Text } from '@components';
import { BORDER_RADIUS, COLORS } from '@utils';
import { useTheme } from '@hooks';
import {
  speaking,
  StreamVideoParticipant,
  useCallStateHooks,
} from '@stream-io/video-react-native-sdk';
import { UserAvatar } from '@components/commons/UserAvatar';

type Props = {};

type ParticipantProps = {
  participant: StreamVideoParticipant;
};

export const Participants = (props: Props) => {
  const { colors } = useTheme();
  const { useParticipants } = useCallStateHooks();
  const participants = useParticipants({ sortBy: speaking });

  return (
    <View style={[styles.container, { backgroundColor: colors.SECONDARY }]}>
      <Text isBold>Participants</Text>
      {/* users */}
      <StackView justify="flex-start" align="center" style={styles.participantList}>
        {participants.map((participant, index) => (
          <Participant key={index} participant={participant} />
        ))}
      </StackView>
    </View>
  );
};
const Participant = ({ participant }: ParticipantProps) => {
  return (
    <View style={styles.participant}>
      <UserAvatar
        user={{ id: participant.userId, image: participant.image, name: participant.name }}
        size="normal"
      />
      <StackView align="center" style={{ columnGap: 3 }}>
        <Text>{participant.name}</Text>
        {participant.isSpeaking && <View style={styles.speakingBadge} />}
      </StackView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: BORDER_RADIUS,
    padding: 10,
    minHeight: 100,
    rowGap: 4,
    marginTop: 20,
  },
  participantList: {
    marginTop: 5,
    columnGap: 5,
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
    height: 80,
    alignItems: 'center',
    justifyContent: 'center',
    width: '30%',
  },
  speakingBadge: {
    backgroundColor: COLORS['dark'].RED,
    width: 5,
    height: 5,
    borderRadius: 5,
  },
});
