import { Pressable, StyleSheet, View } from 'react-native';
import React from 'react';
import { StackView, Text, UserAvatar } from '@components';
import { BORDER_RADIUS, COLORS, dateFormatter, SCREEN_PADDING } from '@utils';

type Props = {};

const Participants = () => {
  const memberCount = 20;
  const COUNT = memberCount >= 4 ? 4 : memberCount;

  // const splicedMember = React.useMemo(() => {
  //   return members?.slice(0, COUNT);
  // }, [members]);

  return (
    <StackView align="center">
      {Array(COUNT)
        .fill('12')
        .map((_, index) => (
          <UserAvatar
            size={30}
            user={{ id: '', image: '', name: 'Adex' }}
            key={`participant_${index}`}
            style={{ borderColor: 'white', borderWidth: 1, marginLeft: index == 0 ? 0 : -5 }}
          />
        ))}
      <Text textAlign="center" style={{ marginLeft: 5 }}>
        +{memberCount - COUNT}
      </Text>
    </StackView>
  );
};

export const CurrentStream = (props: Props) => {
  return (
    <View style={{ marginTop: 10 }}>
      <Text fontSize={25} isBold>
        Currently Listening 🎧
      </Text>
      <View style={[styles.container]}>
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
            {dateFormatter(new Date()?.toString())}
          </Text>
        </StackView>
        <Text isBold>Machine Learning Deep Dive</Text>
        <Text>Dive deep into Machine Learning with expert speakers. Ask questions, share insights, and expand your knowledge!</Text>
        <StackView align="center" justify="space-between" style={{ marginTop: 10 }}>
          <Participants />
          <Pressable style={styles.joinBtn}>
            <Text textTransform="uppercase" fontSize={13} color="white">
              View Stream
            </Text>
          </Pressable>
        </StackView>
      </View>
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
    // backgroundColor: '#2897f7',
    backgroundColor: COLORS['dark'].BLUE,
  },
});
