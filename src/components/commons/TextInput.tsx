import React from 'react';
import { TextInput as RNTextInput, View } from 'react-native';
import { TextInputProps } from './types';
import { COLORS, FONTS, isEmptyString } from '@utils';
import { useTheme } from '@hooks';
import { Text } from './Text';

export const TextInput = React.forwardRef<RNTextInput, TextInputProps>((props, ref) => {
  const {
    keyboardType = 'default',
    returnKeyType = 'next',
    placeholder,
    value,
    multiline,
    autoFocus,
    secureText,
    hintMessage,
    hasError = false,
    placeholderTextColor,
    borderColor = COLORS.dark.GREY,
    autoCapitalize = undefined,
    maxLength,
    mb = 15,
    width = '100%',
    onSubmitEditing,
    onChangeText,
    disabled,
    rightIcon,
  } = props;

  const { colors } = useTheme();
  const [isFocus, setIsFocus] = React.useState(false);
  const placeholderColor = placeholderTextColor ? placeholderTextColor : colors.GREY;

  const getBorderColor = () => {
    let color = borderColor;
    if (hasError) {
      color = colors.RED;
    } else if (!isEmptyString(value)) {
      color = colors.GREEN;
    } else {
      color = borderColor;
    }

    if (isFocus) {
      color = colors.BLUE;
    }
    return color;
  };

  return (
    <View style={{ marginBottom: mb, width }}>
      <View
        style={{
          borderColor: getBorderColor(),
          justifyContent: 'space-between',
          borderRadius: 4,
          paddingVertical: 3,
          paddingHorizontal: 5,
          borderWidth: 1,
          backgroundColor: 'transparent',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <View style={{ flexGrow: 1 }}>
          <RNTextInput
            ref={ref}
            selectionColor={colors.BLUE}
            cursorColor={colors.GREEN}
            value={value}
            onChangeText={onChangeText}
            style={{
              backgroundColor: 'transparent',
              height: multiline ? 90 : 33,
              fontSize: 14,
              fontFamily: FONTS.REGULAR,
              color: colors.TEXT,
              paddingVertical: multiline ? 10 : 0,
              overflow: 'scroll',
              flexWrap: 'wrap',
              textAlign: 'justify',
              textAlignVertical: 'auto',
            }}
            keyboardType={keyboardType}
            returnKeyType={returnKeyType}
            placeholderTextColor={placeholderColor}
            placeholder={placeholder}
            multiline={multiline}
            numberOfLines={multiline ? 8 : 1}
            editable={!disabled}
            onSubmitEditing={onSubmitEditing}
            textAlignVertical={multiline ? 'top' : 'auto'}
            autoFocus={autoFocus}
            onBlur={() => setIsFocus(false)}
            onFocus={() => setIsFocus(true)}
            secureTextEntry={secureText}
            autoCapitalize={autoCapitalize}
            maxLength={maxLength}
            focusable
          />
        </View>
        {rightIcon && <View style={{ height: 30, alignItems: 'center', justifyContent: 'center', minWidth: 30, maxWidth: 50 }}>{rightIcon}</View>}
      </View>
      {Number(hintMessage?.length) > 0 && (
        <Text color={hasError ? colors.RED : colors.GREY} fontSize={12}>
          {hintMessage}
        </Text>
      )}
    </View>
  );
});
