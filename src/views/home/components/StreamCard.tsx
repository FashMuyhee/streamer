import { StyleSheet, View } from 'react-native';
import React from 'react';
import { useTheme } from '@hooks';
import { BORDER_RADIUS, COLORS, SCREEN_PADDING, SCREEN_WIDTH } from '@utils';
import { StackView, Text } from '@components';

type Props = {
  //   participants: User[];
  //   startedAt: Date;
  //   createdBy: User;
  title: string;
  description: string;
};

const Card = ({ description, title }: Props) => {
  const { colors } = useTheme();
  return (
    <View style={[styles.container, { backgroundColor: colors.SECONDARY }]}>
      <StackView justify="flex-start" align="center" style={{ columnGap: 5, marginBottom: 5 }}>
        <View style={styles.liveBadge}>
          <Text fontSize={12} color="white" textAlign="center">
            LIVE
          </Text>
        </View>
        <Text fontSize={12} textAlign="center">
          20 Members
        </Text>
        <Text fontSize={12} textAlign="center">
          {new Date()?.toLocaleDateString()}
        </Text>
      </StackView>
      <Text isBold>{title}</Text>
      <Text>{description}</Text>
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
    width: SCREEN_WIDTH - (SCREEN_PADDING * 2 + 10),
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
