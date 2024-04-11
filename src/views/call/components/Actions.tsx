import { Pressable, StyleSheet, View } from 'react-native';
import React from 'react';
import { CloudIcon, MuteIcon, StopIcon, Text, UnmuteIcon } from '@components';
import { COLORS } from '@utils';
import { useConfirmationAlert, useTheme } from '@hooks';
import { useCall, useCallStateHooks } from '@stream-io/video-react-native-sdk';
import { useNavigation } from '@react-navigation/native';

type Props = {
  isHost: boolean;
};

export const Actions = ({ isHost }: Props) => {
  const { colors } = useTheme();

  const navigation = useNavigation();

  const stopAlert = useConfirmationAlert();
  const leaveAlert = useConfirmationAlert();
  const endLiveAlert = useConfirmationAlert();

  const call = useCall();

  const { useMicrophoneState, useIsCallLive } = useCallStateHooks();
  const isLive = useIsCallLive();
  const { isMute } = useMicrophoneState();

  const onToggleMute = () => {
    call?.microphone.toggle();
  };

  const goLive = async () => {
    try {
      await call?.goLive();
    } catch (error) {
      console.log(error);
      // err message
    }
  };

  const stopLive = async () => {
    try {
      await call?.stopLive();
    } catch (error) {
      console.log(error);
      // err message
    }
  };

  const onToggleLive = () => {
    stopAlert.onShow({
      title: isLive ? 'Stop Stream' : 'Resume Stream',
      message: isLive
        ? 'Are you sure you want to stop the stream ?'
        : 'Do you want to resume this stream ?',
      onProceed: async () => {
        isLive ? stopLive() : goLive();
      },
      proceedText: isLive ? 'Stop' : 'Go Live',
      closeText: 'Cancel',
    });
  };

  const onLeaveRoom = () => {
    leaveAlert.onShow({
      title: 'Leave Room',
      message: 'Are you sure you want to leave the room?',
      onProceed: async () => {
        try {
          await call?.leave();
          navigation.goBack();
        } catch (error) {
          // err message
        }
      },
      proceedText: 'Leave',
      closeText: 'Cancel',
    });
  };

  const onEndLive = () => {
    endLiveAlert.onShow({
      title: 'End Live',
      message: 'Are you sure you want to end the live?',
      onProceed: async () => {
        try {
          await call?.endCall();
          navigation.goBack();
        } catch (error) {
          // err message
        }
      },
      proceedText: 'End Stream',
      closeText: 'Cancel',
    });
  };

  const onEndCall = () => {
    if (isHost) {
      onEndLive();
    } else {
      onLeaveRoom();
    }
  };

  return (
    <View style={style.container}>
      <View style={[style.action, { backgroundColor: colors.SECONDARY }]}>
        {isHost && (
          <Pressable
            onPress={onToggleLive}
            style={[style.actionBtn, { backgroundColor: COLORS['dark'].RED }]}
            role="button"
          >
            {isLive ? <StopIcon /> : <CloudIcon />}
          </Pressable>
        )}
        <Pressable
          onPress={onToggleMute}
          style={[style.actionBtn, { backgroundColor: '#0e9c60' }]}
          role="button"
        >
          {isMute ? <UnmuteIcon /> : <MuteIcon />}
        </Pressable>
      </View>
      <Text onPress={onEndCall} style={{ color: colors.BLUE, paddingVertical: 10 }}>
        {isHost ? 'End Call' : 'Leave Room'}
      </Text>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 30,
    alignSelf: 'center',
    alignItems: 'center',
    width: '100%',
  },
  action: {
    height: 75,
    borderRadius: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
    marginBottom: 10,
  },
  actionBtn: {
    width: 45,
    height: 45,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
