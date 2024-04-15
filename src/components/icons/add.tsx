import React from 'react';
import Svg, { Path } from 'react-native-svg';

export const AddIcon = () => {
  return (
    <Svg width={25} height={25} viewBox="0 0 256 256" fill="white">
      <Path d="M224 128a8 8 0 01-8 8h-80v80a8 8 0 01-16 0v-80H40a8 8 0 010-16h80V40a8 8 0 0116 0v80h80a8 8 0 018 8z" />
    </Svg>
  );
};
