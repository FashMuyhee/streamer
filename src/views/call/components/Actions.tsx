import { StyleSheet, View } from 'react-native';
import React from 'react';
import { CloudIcon, MuteIcon, SpeakerIcon, StackView, StopIcon, Text, UnmuteIcon } from '@components';
import { COLORS, IS_ANDROID } from '@utils';
import { useConfirmationAlert, useTheme } from '@hooks';
import { OwnCapability, useCall, useCallStateHooks } from '@stream-io/video-react-native-sdk';
import { useNavigation } from '@react-navigation/native';
import { useEndStream, useToggleMic } from '../hooks';
import Toast from 'react-native-toast-message';
import { IconButton } from '@components/commons/IconButton';
//@ts-ignore
import InCallManager from 'react-native-incall-manager';
import { useSpeakRequest } from '../hooks/useSpeakRequests';

type Props = {
  isHost: boolean;
  openRequests: () => void;
};

export const Actions = ({ isHost, openRequests }: Props) => {
  const { colors } = useTheme();
  const navigation = useNavigation();
  const stopAlert = useConfirmationAlert();
  const leaveAlert = useConfirmationAlert();
  const endLiveAlert = useConfirmationAlert();

  // STREAM HOOKS AND STATES
  const call = useCall();
  const { useIsCallLive, useHasPermissions } = useCallStateHooks();
  const isLive = useIsCallLive();
  const { isMute, toggleMic, disabled } = useToggleMic();
  const [isSpeaker, setIsSpeaker] = React.useState(false);
  const canUpdatePermissions = useHasPermissions(OwnCapability.UPDATE_CALL_PERMISSIONS);
  const { speakingRequests } = useSpeakRequest();
  const canAcceptRequest = React.useMemo(() => {
    return canUpdatePermissions && speakingRequests.length > 0;
  }, [speakingRequests, canUpdatePermissions]);

  const { onEndStream } = useEndStream(call?.cid as string);

  // FUNCTIONS AND ACTIONS
  const toggleSpeakerPhone = () => {
    InCallManager.setSpeakerphoneOn(!isSpeaker);
    setIsSpeaker(!isSpeaker);
  };

  const goLive = async () => {
    try {
      await call?.goLive();
      Toast.show({ text1: "Yippie, you're live 🥳", type: 'success' });
    } catch (error) {
      Toast.show({ text1: 'Something went wrong try again', type: 'error' });
    }
  };

  const stopLive = async () => {
    try {
      await call?.stopLive();
      Toast.show({ text1: 'Stream stopped ', type: 'success' });
      // Called when call is left
      InCallManager.stop();
    } catch (error) {
      Toast.show({ text1: 'Something went wrong try again', type: 'error' });
    }
  };

  const onToggleLive = () => {
    stopAlert.onShow({
      title: isLive ? 'Stop Stream' : 'Resume Stream',
      message: isLive ? 'Are you sure you want to stop the stream ?' : 'Do you want to resume this stream ?',
      onProceed: async () => {
        isLive ? stopLive() : goLive();
      },
      proceedText: isLive ? 'Stop' : 'Go Live',
      closeText: 'Cancel',
    });
  };

  const onLeaveRoom = () => {
    leaveAlert.onShow({
      title: 'Leave Stream',
      message: 'Are you sure you want to leave this stream ?',
      onProceed: async () => {
        try {
          await call?.leave();
          // Called when call is left
          InCallManager.stop();
          navigation.goBack();
        } catch (error) {
          Toast.show({ text1: 'Something went wrong try again', type: 'error' });
        }
      },
      proceedText: 'Leave',
      closeText: 'Cancel',
    });
  };

  const onEndLive = () => {
    endLiveAlert.onShow({
      title: 'End Stream',
      message: 'Are you sure you want to end the stream ?',
      onProceed: async () => {
        try {
          await call?.endCall();
          onEndStream();
          navigation.goBack();
          Toast.show({ text1: 'Stream Ended', type: 'info' });
        } catch (error) {
          Toast.show({ text1: 'Something went wrong try again', type: 'error' });
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
        {isHost && <IconButton size={45} onPress={onToggleLive} bg={COLORS['dark'].RED} icon={isLive ? <StopIcon /> : <CloudIcon />} />}
        <IconButton size={45} onPress={toggleMic} disabled={disabled} bg="#0e9c60" icon={isMute ? <UnmuteIcon /> : <MuteIcon />} />
        <IconButton
          size={45}
          onPress={toggleSpeakerPhone}
          bg={isSpeaker ? '#d8d9e4' : undefined}
          icon={<SpeakerIcon color={isSpeaker ? COLORS.light['TEXT'] : colors['TEXT']} />}
        />
      </View>
      <StackView align="center" justify="center" style={{ columnGap: 50 }}>
        <Text onPress={onEndCall} style={{ color: colors.RED, paddingVertical: 10 }}>
          {isHost ? 'End Stream' : 'Leave Stream'}
        </Text>
        {canAcceptRequest && (
          <Text onPress={openRequests} style={{ color: colors.BLUE, paddingVertical: 10 }}>
            Speak Requests
          </Text>
        )}
      </StackView>
    </View>
  );
};

const style = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: IS_ANDROID ? 4 : 30,
    alignSelf: 'center',
    alignItems: 'center',
    width: '100%',
  },
  action: {
    height: 70,
    borderRadius: 10,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    columnGap: 10,
    marginBottom: 10,
  },
});
