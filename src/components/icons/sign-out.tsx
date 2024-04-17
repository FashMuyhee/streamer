import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { SvgIconProps } from './type';

export const SignOutIcon: React.FC<SvgIconProps> = ({ color = '#292D32' }) => {
  return (
    <Svg width={25} height={25} viewBox="0 0 256 256" fill={color}>
      <Path d="M120 216a8 8 0 01-8 8H48a8 8 0 01-8-8V40a8 8 0 018-8h64a8 8 0 010 16H56v160h56a8 8 0 018 8zm109.66-93.66l-40-40a8 8 0 00-11.32 11.32L204.69 120H112a8 8 0 000 16h92.69l-26.35 26.34a8 8 0 0011.32 11.32l40-40a8 8 0 000-11.32z" />
    </Svg>
  );
};
