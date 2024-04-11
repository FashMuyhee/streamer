import React from 'react';
import { BaseToast, ToastConfig, BaseToastProps } from 'react-native-toast-message';
import { COLORS, FONTS, IS_ANDROID, SCREEN_WIDTH, STATUSBAR_HEIGHT } from '@utils';

type ToastType = 'success' | 'error' | 'info';

interface ToastProp extends BaseToastProps {
  type: ToastType;
}

const CustomToast = ({ type, ...props }: ToastProp) => {
  const bgColor = React.useMemo(() => {
    if (type == 'error') {
      return COLORS['dark'].RED;
    }
    if (type == 'info') {
      return COLORS['dark'].BLUE;
    }
    return '#1fde6b';
  }, [type]);

  return (
    <BaseToast
      {...props}
      style={{
        width: SCREEN_WIDTH,
        elevation: 0,
        backgroundColor: bgColor,
        height: IS_ANDROID ? 55 : STATUSBAR_HEIGHT + 35,
        borderRadius: 0,
        borderLeftWidth: 0,
      }}
      text1Style={{
        fontSize: 15,
        fontFamily: FONTS.REGULAR,
        color: 'white',
        fontWeight: '400',
        marginTop: !IS_ANDROID ? 30 : 0,
      }}
      text2Style={{
        fontSize: 12,
        fontFamily: FONTS.REGULAR,
        color: 'white',
        marginTop: -5,
      }}
      contentContainerStyle={{
        paddingHorizontal: 15,
      }}
      text1NumberOfLines={3}
    />
  );
};

const toastConfig: ToastConfig = {
  success: (props: BaseToastProps) => <CustomToast type="success" {...props} />,
  error: (props: BaseToastProps) => <CustomToast type="error" {...props} />,
  info: (props: BaseToastProps) => <CustomToast type="info" {...props} />,
};

export default toastConfig;
