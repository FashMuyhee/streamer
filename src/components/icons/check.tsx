import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { SvgIconProps } from './type';

export const CheckIcon: React.FC<SvgIconProps> = ({ color = '#FFF' }) => {
  return (
    <Svg width={20} height={20} viewBox="0 0 256 256" fill={color}>
      <Path d="M232.49 80.49l-128 128a12 12 0 01-17 0l-56-56a12 12 0 1117-17L96 183 215.51 63.51a12 12 0 0117 17z" />
    </Svg>
  );
};
