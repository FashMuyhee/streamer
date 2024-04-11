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
