import { Image, Pressable } from 'react-native';
import React from 'react';
import { COLORS, initializeText } from '@utils';
import { UserProps } from './types';
import { Text } from './Text';
import { CenterView } from './Flex';

const SMALL = 40;
const NORMAL = 60;

const Wrapper = ({ size = 'small', user, ...props }: UserProps) => {
  const getSize = React.useMemo(() => {
    if (size == 'normal') return NORMAL;
    return SMALL;
  }, [size]);

  const isImageType = !!user?.image;

  return (
    <Pressable
      style={{
        height: getSize,
        width: getSize,
        borderRadius: getSize / 2,
        backgroundColor: COLORS['dark'].BLUE,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      hitSlop={{ top: 10, left: 10, right: 10, bottom: 10 }}
      onPress={props.onPress}
    >
      {!isImageType ? (
        <Text style={{ fontSize: 20, color: 'white' }}>
          {initializeText(user?.name as string, true)}
        </Text>
      ) : (
        <CenterView
          style={{
            borderRadius: getSize / 2,
            height: getSize - 2,
            width: getSize - 2,
          }}
        >
          <Image
            source={{ uri: user.image }}
            style={{
              height: getSize - 5,
              width: getSize - 5,
              borderRadius: getSize / 2,
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
