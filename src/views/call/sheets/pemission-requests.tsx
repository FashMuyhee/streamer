import { View, Modal, Pressable, StyleSheet } from 'react-native';
import React from 'react';
import { BORDER_RADIUS, COLORS, IS_ANDROID, SCREEN_HEIGHT, SCREEN_WIDTH } from '@utils';
import { useTheme } from '@hooks';
import { CancelIcon, CheckIcon, StackView, Text } from '@components';
import {
  OwnCapability,
  PermissionRequestEvent,
  useCall,
  useCallStateHooks,
} from '@stream-io/video-react-native-sdk';
import { IconButton } from '@components/commons/IconButton';
import { UserAvatar } from '@components/commons/UserAvatar';
import Toast from 'react-native-toast-message';
import { useSpeakRequest } from '../hooks';

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

type RequestCardProps = {
  request: PermissionRequestEvent;
  onApprove: () => void;
  onDeny: () => void;
};

const RequestCard = ({ request, onApprove, onDeny }: RequestCardProps) => {
  const { colors } = useTheme();
  const { id, image, name } = request.user;
  return (
    <StackView
      justify="space-between"
      align="center"
      style={{
        height: 50,
        borderRadius: BORDER_RADIUS,
        backgroundColor: colors.SECONDARY,
        marginBottom: 5,
        paddingHorizontal: 10,
      }}
    >
      <StackView align="center" style={{ width: '70%', columnGap: 10 }}>
        {/* @ts-ignore */}
        <UserAvatar size="small" user={{ id, image, name }} />
        <Text truncate fontSize={12}>
          {name}
        </Text>
      </StackView>
      <StackView justify="space-between" align="center" style={{ width: '25%', columnGap: 5 }}>
        <IconButton size={30} icon={<CheckIcon />} onPress={onApprove} bg={COLORS['dark'].BLUE} />
        <IconButton size={30} icon={<CancelIcon />} onPress={onDeny} bg={COLORS['dark'].RED} />
      </StackView>
    </StackView>
  );
};

export const PermissionRequests = ({ isOpen, onClose }: Props) => {
  const { colors } = useTheme();
  const call = useCall();
  const { useHasPermissions } = useCallStateHooks();
  const canUpdatePermissions = useHasPermissions(OwnCapability.UPDATE_CALL_PERMISSIONS);
  const { speakingRequests, setSpeakingRequests } = useSpeakRequest();

  const handlePermissionRequest = async (request: PermissionRequestEvent, approve: boolean) => {
    const { user, permissions } = request;
    try {
      if (approve) {
        await call?.grantPermissions(user.id, permissions);
      } else {
        await call?.revokePermissions(user.id, permissions);
      }
      setSpeakingRequests((reqs) => reqs.filter((req) => req !== request));
      onClose();
    } catch (err) {
      Toast.show({ text1: 'Error granting or revoking permissions', type: 'error' });
    }
  };

  if (!canUpdatePermissions || !speakingRequests.length) {
    return null;
  }
  return (
    <Modal
      visible={isOpen}
      onRequestClose={onClose}
      statusBarTranslucent
      transparent
      style={{ height: SCREEN_HEIGHT, width: SCREEN_WIDTH }}
      animationType="slide"
    >
      <View style={{ width: '100%', height: '100%', backgroundColor: 'rgba(18, 18, 18, 0.51)' }}>
        <Pressable style={{ width: '100%', height: '100%' }} onPress={onClose} />
        <View style={[styles.detachedContainer, { backgroundColor: colors.PRIMARY }]}>
          <Text isBold fontSize={17}>
            Permission Requests
          </Text>
          <View style={{ marginTop: 20 }}>
            {speakingRequests.map((request, index) => (
              <RequestCard
                key={index}
                request={request}
                onApprove={() => handlePermissionRequest(request, true)}
                onDeny={() => handlePermissionRequest(request, false)}
              />
            ))}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  detachedContainer: {
    width: SCREEN_WIDTH * 0.95,
    alignSelf: 'center',
    bottom: IS_ANDROID ? 20 : 40,
    position: 'absolute',
    height: 230,
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingTop: 10,
  },
});
