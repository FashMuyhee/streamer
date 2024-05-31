import { ColorPalette, Theme } from '@contexts';
import { Dimensions, Platform, StatusBar, StyleProp, ViewStyle } from 'react-native';

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
    GREEN: '#00b894', //#0e9c60
    GREY: '#aba5a5',
  },
  dark: {
    PRIMARY: '#090b20',
    SECONDARY: '#191b32',
    RED: '#fd5056',
    BLUE: '#2466ee',
    TEXT: '#FFFFFF',
    GREEN: '#00b894', //#0e9c60
    GREY: '#aba5a5',
  },
};

export const IS_ANDROID = Platform.OS == 'android';

export const SCREEN_PADDING = 15;
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

export const API_KEY = 'nxw8gsrkqfmj';
export const TOKEN_API = 'https://streamer-token-api.onrender.com/generate-stream-token'

// DEMO INFO
// export const API_KEY = 'mmhfdzb5evj2';
export const TOKEN =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiU2hhYWtfVGkiLCJpc3MiOiJodHRwczovL3Byb250by5nZXRzdHJlYW0uaW8iLCJzdWIiOiJ1c2VyL1NoYWFrX1RpIiwiaWF0IjoxNzE1MDI5NjY5LCJleHAiOjE3MTU2MzQ0NzR9.P2GQdCRS4NUfX5RFavbcC-cbhQAsV65OG54VZBLvfKo';
export const USER_ID = 'Shaak_Ti'; // the user id can be found in the "Credentials" section
export const CALL_ID = 'b3lgeiOM6gtT';
