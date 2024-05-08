import { StyleSheet, View } from 'react-native';
import React from 'react';
import { useTheme } from '@hooks';
import { BORDER_RADIUS, COLORS, SCREEN_PADDING, SCREEN_WIDTH } from '@utils';
import { StackView, Text } from '@components';
import { User } from '@contexts';

type Props = {
  participants: User[];
  createdAt: string;
  endedAt: string;
  createdBy: User;
  title: string;
  description: string;
  isLive?: boolean;
};

const Card = ({ description, title, isLive = true, createdAt, createdBy, endedAt, participants }: Props) => {
  const { colors } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: colors.SECONDARY }]}>
      <StackView justify="flex-start" align="center" style={{ columnGap: 5, marginBottom: 5 }}>
        {isLive && (
          <View style={styles.liveBadge}>
            <Text fontSize={12} color="white" textAlign="center">
              LIVE
            </Text>
          </View>
        )}
        <Text fontSize={12} textAlign="center">
          {participants?.length ?? 0} Members
        </Text>
        <Text fontSize={12} textAlign="center">
          {new Date(createdAt)?.toLocaleDateString()}
        </Text>
      </StackView>
      <Text isBold textTransform="capitalize">
        {title}
      </Text>
      <Text>{description}</Text>
      {endedAt && <Text fontSize={12}>{`Ended At${new Date(endedAt)?.toLocaleDateString()}`}</Text>}
    </View>
  );
};

export const StreamCard = React.memo(Card);

const styles = StyleSheet.create({
  container: {
    borderRadius: BORDER_RADIUS,
    paddingVertical: 20,
    paddingHorizontal: SCREEN_PADDING,
    rowGap: 4,
    width: SCREEN_WIDTH - SCREEN_PADDING * 2,
    maxHeight: 180,
    marginTop: 15,
  },
  liveBadge: {
    borderRadius: 3,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 10,
    backgroundColor: COLORS['dark'].RED,
  },
});
