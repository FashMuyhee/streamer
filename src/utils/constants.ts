import { ColorPalette, Theme } from '@contexts';
import { Dimensions, Platform, StatusBar } from 'react-native';

/**
 *  default fonts
 */
export const FONTS = {
  REGULAR: 'Jost-Regular',
  BOLD: 'Jost-Bold',
  MEDIUM: 'Jost-Medium',
  ITALICS: 'Jost-Italic',
  MEDIUM_ITALICS: 'Jost-MediumItalic',
  BOLD_ITALICS: 'Jost-BoldItalic',
};

/**
 * COLORS LIST
 */

export type ColorsList<T extends Theme> = {
  [key in T]: ColorPalette;
};

export const COLORS: ColorsList<Theme> = {
  light: {
    PRIMARY: '#FFFFFF',
    SECONDARY: '#F4F4F4',
    RED: '#fd5056',
    BLUE: '#2466ee',
    TEXT: '#1b1b1b',
  },
  dark: {
    PRIMARY: '#090b20',
    SECONDARY: '#191b32',
    RED: '#fd5056',
    BLUE: '#2466ee',
    TEXT: '#FFFFFF',
  },
};

export const IS_ANDROID = Platform.OS == 'android';

export const SCREEN_PADDING = 24;
export const SCREEN_HEIGHT = Dimensions.get('window').height;
export const SCREEN_WIDTH = Dimensions.get('window').width;

export const BORDER_RADIUS = 7;

export const KEYBOARD_BEHAVIOR = 'padding';

/**
 * ACTION SHEET OPENING ANIMATION CONFIG
 */
export const ACTION_SHEET_ANIMATION = {
  bounciness: 5,
  overshootClamping: false,
};

/**
 *  statusbar height
 */
const getStatusbarHeight = () => {
  // @ts-ignore
  const androidStatusBarHeight = (StatusBar.currentHeight + 15) as number;
  const IOS_STATUSBAR_HEIGHT = 54;
  // const IOS_STATUSBAR_HEIGHT = hasDynamicIsland || hasNotch ? 100 : 54;
  return !IS_ANDROID ? IOS_STATUSBAR_HEIGHT : androidStatusBarHeight;
};

export const STATUSBAR_HEIGHT = getStatusbarHeight();

/**
 PERSISTED KEYS
 * 
 */
export enum PERSISTED_STORAGE_KEYS {
  AUTH_REDUCER = 'AUTH_REDUCER',
  REACT_QUERY = 'REACT_QUERY',
}

export const SHADOW_STYLE = IS_ANDROID
  ? { elevation: 4 }
  : {
      shadowColor: '#171717',
      shadowOffset: { width: -2, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 3,
    };
