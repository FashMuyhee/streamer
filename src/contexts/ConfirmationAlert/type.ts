import {StyleProp, TextStyle} from 'react-native';

export type ConfirmationAlertOption = {
  message: string;
  onProceed?: () => void;
  closeText?: string;
  proceedText: string;
  title?: string;
  messageStyle?: StyleProp<TextStyle>;
};

export interface ConfirmationAlertContext {
  onShow: (option: ConfirmationAlertOption) => void;
  isVisible: boolean;
}
