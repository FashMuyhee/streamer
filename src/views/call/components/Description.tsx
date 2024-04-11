import { StyleSheet, View } from 'react-native';
import React from 'react';
import { Text } from '@components';
import { BORDER_RADIUS } from '@utils';
import { useTheme } from '@hooks';
import { useCallStateHooks } from '@stream-io/video-react-native-sdk';

type Props = {};

export const Description = ({}: Props) => {
  const { colors } = useTheme();
  const { useCallCustomData, useParticipants, useIsCallLive } = useCallStateHooks();
  const isLive = useIsCallLive();
  const data = useCallCustomData();
  const participants = useParticipants();

  return (
    <View style={[styles.container, { backgroundColor: colors.SECONDARY }]}>
      <View style={styles.headerRow}>
        <View style={[styles.liveBadge, { backgroundColor: !isLive ? '#d8d9e4' : colors.RED }]}>
          <Text fontSize={12} color={isLive ? 'white' : 'black'} textAlign="center">
            {isLive ? 'Live' : 'Not Live'}
          </Text>
        </View>
        <Text fontSize={12} textAlign="center">
          {participants.length} Participants
        </Text>
      </View>
      <Text isBold>{data?.title}</Text>
      <Text>{data?.description}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: BORDER_RADIUS,
    padding: 10,
    minHeight: 100,
    rowGap: 4,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
  },
  headerRow: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  liveBadge: {
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
});
