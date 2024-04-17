import { Image, Pressable } from 'react-native';
import React from 'react';
import { COLORS, initializeText } from '@utils';
import { UserProps } from './types';
import { Text } from './Text';
import { CenterView } from './Flex';

const Wrapper = ({ size = 40, user, ...props }: UserProps) => {
  const isImageType = !!user?.image;

  return (
    <Pressable
      style={[
        {
          height: size,
          width: size,
          borderRadius: size / 2,
          backgroundColor: COLORS['dark'].BLUE,
          alignItems: 'center',
          justifyContent: 'center',
        },
        props.style,
      ]}
      hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}
      onPress={props.onPress}
    >
      {!isImageType ? (
        <Text fontSize={size * 0.5} isBold textTransform="capitalize" style={{ color: 'white' }}>
          {initializeText(user?.name as string, true)}
        </Text>
      ) : (
        <CenterView
          style={{
            borderRadius: size / 2,
            height: size,
            width: size,
          }}
        >
          <Image
            source={{ uri: user.image }}
            style={{
              height: size,
              width: size,
              borderRadius: size / 2,
              backgroundColor: '#ececec',
            }}
            fadeDuration={1000}
          />
        </CenterView>
      )}
    </Pressable>
  );
};
export const UserAvatar = React.memo(Wrapper);
