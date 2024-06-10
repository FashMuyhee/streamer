import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { SvgIconProps } from './type';

export const CancelIcon: React.FC<SvgIconProps> = ({ color = '#FFF', iconSize = 20 }) => {
  return (
    <Svg width={iconSize} height={iconSize} viewBox="0 0 256 256" fill={color}>
      <Path d="M208.49 191.51a12 12 0 01-17 17L128 145l-63.51 63.49a12 12 0 01-17-17L111 128 47.51 64.49a12 12 0 0117-17L128 111l63.51-63.52a12 12 0 0117 17L145 128z" />
    </Svg>
  );
};
