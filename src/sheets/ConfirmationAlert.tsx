import React from 'react';
import { SCREEN_HEIGHT } from '@utils';
import { Button, Text } from '@components';
import { Modal, View } from 'react-native';
import { ConfirmationAlertOption } from '@contexts/ConfirmationAlert/type';
import { useTheme } from '@hooks';

interface Props {
  option: ConfirmationAlertOption;
  isVisible: boolean;
  onClose: () => void;
}

export const ConfirmationAlert = ({ isVisible, option, onClose }: Props) => {
  const { closeText, message, title, proceedText, messageStyle } = option;
  const { colors } = useTheme();

  const onProceed = () => {
    onClose();
    if (option.onProceed) {
      option.onProceed();
    }
  };

  return (
    <Modal
      visible={isVisible}
      onRequestClose={onClose}
      transparent
      statusBarTranslucent
      animationType="fade"
    >
      <View style={{ width: '100%', height: '100%', backgroundColor: 'rgba(18, 18, 18, 0.51)' }}>
        <View
          style={{ width: '100%', height: '100%', alignItems: 'center', justifyContent: 'center' }}
        >
          <View
            style={{
              height: SCREEN_HEIGHT * 0.25,
              width: '85%',
              borderRadius: 16,
              backgroundColor: colors.SECONDARY,
              alignItems: 'center',
              paddingHorizontal: 5,
            }}
          >
            <Text
              style={{ marginTop: '4%' }}
              textAlign="center"
              fontSize={18}
              isBold
              textTransform="capitalize"
            >
              {title}
            </Text>
            <Text
              textAlign="center"
              style={[{ marginTop: 15, marginHorizontal: 20, marginBottom: 10 }, messageStyle]}
            >
              {message}
            </Text>
            <View
              style={{
                position: 'absolute',
                bottom: 5,
                justifyContent: 'space-between',
                alignItems: 'center',
                flexDirection: 'row',
              }}
            >
              <Button
                title={String(closeText)}
                fontSize={13}
                onPress={onClose}
                style={{ width: '47%', height: 40, borderRadius: 10 }}
                bg={colors.RED}
              />
              <Button
                title={proceedText}
                onPress={onProceed}
                fontSize={13}
                style={{ width: '47%', height: 40, borderRadius: 10 }}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};
