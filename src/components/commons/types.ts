import { GestureResponderEvent, StyleProp, TextStyle, ViewStyle } from 'react-native';

// TEXT COMPONENTS TYPES
export interface TextProps {
  children?: string | undefined | React.ReactNode;
  style?: StyleProp<TextStyle>;
  color?: string;
  isBold?: boolean;
  fontSize?: number;
  textAlign?: TextStyle['textAlign'];
  textTransform?: TextStyle['textTransform'];
  onPress?: () => void;
  truncate?: boolean;
  truncateLength?: number;
  numberLines?: number;
}

export interface ScreenWrapperProps {
  bg?: string;
  children: React.ReactNode;
  padding?: number;
  padded?: boolean;
  noEdges?: boolean;
  style?: StyleProp<ViewStyle>;
}

// BUTTON COMPONENT
export interface ButtonProps {
  title: string;
  onPress?: (event: GestureResponderEvent) => void;
  textColor?: string;
  style?: StyleProp<ViewStyle>;
  disabled?: boolean;
  isLoading?: boolean;
  bg?: string;
  fontSize?: number;
  height?: number;
}

export interface IconButtonProps {
  icon: React.ReactElement;
  style?: StyleProp<ViewStyle>;
  size?: number;
  onPress?: () => void;
  disabled?: boolean;
  rounded?: boolean;
  bg?: string;
}

// USER AVATAR PROPS
export type UserSize = 'small' | 'normal';

export type UserProps = {
  size?: UserSize;
  onPress?: () => void;
  user?: { id: string; name: string; image: string };
};
