import { Pressable, StyleSheet, View } from 'react-native';
import React from 'react';
import { StackView, Text, UserAvatar } from '@components';
import { BORDER_RADIUS, COLORS, dateFormatter, SCREEN_PADDING } from '@utils';
import { useGetCurrentStream } from '../firebase';
import { useAuth, useTheme } from '@hooks';
import { User } from '@contexts';

const Participants = ({ participants }: { participants: User[] }) => {
  const memberCount = participants?.length ?? 0;
  const COUNT = memberCount >= 4 ? 4 : memberCount;

  return (
    <StackView align="center">
      {participants &&
        participants.map((user, index) => (
          <UserAvatar
            size={30}
            user={{ id: user.uid, image: String(user?.photoURL), name: user.lastName }}
            key={`participant_${user.uid}`}
            style={{ borderColor: 'white', borderWidth: 1, marginLeft: index == 0 ? 0 : -5 }}
          />
        ))}
      {memberCount > 1 && (
        <Text textAlign="center" style={{ marginLeft: 5 }}>
          +{memberCount - COUNT}
        </Text>
      )}
    </StackView>
  );
};

export const CurrentStream = () => {
  const { isLoading, stream } = useGetCurrentStream();
  const { colors } = useTheme();
  const { user } = useAuth();
  const isHost = stream?.createdBy.uid == user?.uid;

  const goToStream = () => {};

  if (!stream) return null;

  return (
    <View style={{ marginTop: 10, marginBottom: 40 }}>
      <Text fontSize={25} isBold>
        Currently Listening 🎧
      </Text>
      {isLoading ? (
        <View style={[styles.loading, { backgroundColor: colors.SECONDARY }]} />
      ) : (
        <View style={[styles.container]}>
          <StackView justify="flex-start" align="center" style={{ columnGap: 5, marginBottom: 5 }}>
            <View style={styles.liveBadge}>
              <Text fontSize={12} color="white" textAlign="center">
                LIVE
              </Text>
            </View>
            <Text fontSize={12} textAlign="center">
              {stream?.participants.length ?? 0} Members
            </Text>
            <Text fontSize={12} textAlign="center">
              {dateFormatter(stream?.createdAt as string)}
            </Text>
          </StackView>
          {!isHost && (
            <View style={styles.createdBy}>
              <Text color="white" truncate fontSize={12}>
                By: {`${stream?.createdBy.firstName} ${stream?.createdBy.lastName}`}
              </Text>
            </View>
          )}
          <Text isBold>{stream?.title}</Text>
          <Text>{stream?.description}</Text>
          <StackView align="center" justify="space-between" style={{ marginTop: 10 }}>
            <Participants participants={stream?.participants as User[]} />
            <Pressable onPress={goToStream} style={styles.joinBtn}>
              <Text textTransform="uppercase" fontSize={13} color="white">
                View Stream
              </Text>
            </Pressable>
          </StackView>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: BORDER_RADIUS,
    paddingVertical: 20,
    paddingHorizontal: SCREEN_PADDING,
    rowGap: 4,
    width: '100%',
    marginTop: 15,
    backgroundColor: COLORS['dark'].GREEN,
  },
  loading: {
    width: '100%',
    height: 150,
    borderRadius: BORDER_RADIUS,
    marginTop: 15,
  },
  createdBy: {
    backgroundColor: COLORS['dark'].SECONDARY,
    paddingHorizontal: 10,
    borderRadius: 3,
    paddingVertical: 3,
    width: '30%',
  },
  liveBadge: {
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    backgroundColor: COLORS['dark'].RED,
  },
  joinBtn: {
    width: 130,
    height: 35,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: COLORS['light'].PRIMARY,
    borderRadius: BORDER_RADIUS,
    backgroundColor: COLORS['dark'].BLUE,
  },
});
