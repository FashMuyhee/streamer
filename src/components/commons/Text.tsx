import React from 'react';
import { Text as RNText } from 'react-native';
import { TextProps } from './types';
import { FONTS } from '@utils';
import { useTheme } from '@hooks';

export const Text: React.FunctionComponent<TextProps> = ({
  style,
  children,
  isBold,
  fontSize = 14,
  color,
  textAlign,
  textTransform,
  onPress,
  truncate,
  numberLines,
}: TextProps) => {
  const { colors } = useTheme();

  const fontFamily = React.useMemo(() => {
    return isBold ? FONTS.BOLD : FONTS.REGULAR;
  }, [isBold]);

  color = !!color ? color : colors.TEXT;

  return (
    <RNText
      onPress={onPress}
      style={[{ textTransform, fontFamily, color, fontSize, textAlign }, style]}
      numberOfLines={truncate ? (numberLines ? numberLines : 1) : numberLines}
      lineBreakMode="tail"
      textBreakStrategy="simple"
      ellipsizeMode="tail"
      selectionColor={colors.PRIMARY}
    >
      {children}
    </RNText>
  );
};
