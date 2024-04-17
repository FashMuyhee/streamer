import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { SvgIconProps } from './type';

export const ChevronLeftIcon: React.FC<SvgIconProps> = ({ color = '#292D32' }) => {
  return (
    <Svg width={18} height={18} viewBox="0 0 256 256" fill={color}>
      <Path d="M165.66 202.34a8 8 0 01-11.32 11.32l-80-80a8 8 0 010-11.32l80-80a8 8 0 0111.32 11.32L91.31 128z" />
    </Svg>
  );
};
